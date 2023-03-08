import { OpenAPIV3 } from "openapi-types";
import ts from "typescript";
import {
  createSchemaExport,
  createZodImport,
  writeStatementsToFile,
  zfs,
  zodSubMemberCreators,
  zodTokens,
} from "../../dist";
import { parseArguments } from "./helpers";

class MissingRefError extends Error {
  isMissingRefError = true;
  constructor(message: string) {
    super(message);
  }
}

// order of operations
// First we get the type, then translate it to equivalent zod type.
// Also all the while we are building up the zfs params

const schemaConfig = {
  translations: {
    pattern: "regex",
    minLength: "min",
    maxLength: "max",
    description: "describe",
    minimum: "min",
    maximum: "max",
    integer: "number",
  },
  allowedFormats: [
    "date",
    "date-time",
    "email",
    "hostname",
    "ipv4",
    "ipv6",
    "uri",
    "uuid",
  ],
  ignoredTokens: ["readOnly", "writeOnly", "type", "oneOf", "format", "enum"],
};

const translateSymbol = (symbol: string) => {
  return (
    schemaConfig.translations[
      symbol as keyof typeof schemaConfig.translations
    ] || symbol
  );
};

const deleteKey = <T, K extends keyof T>(key: K, obj: T): Omit<T, K> => {
  const { [key]: _, ...rest } = obj;
  return rest;
};

const visitRef = (ref: string) => {
  const name = ref.replace("#/components/schemas/", "");
  const existingExpression = schemaExpressionsRegistry.get(name);
  if (!existingExpression) {
    console.log(
      "[codegen-openapi] No existing expression for $ref with name",
      name
    );
    console.log("[codegen-openapi] Skipping for now");
    throw new MissingRefError(
      'No existing expression for $ref with name "' + name + '"'
    );
  }

  // TODO: decide whether we want to use the identifier or drop in the expression itself
  return ts.factory.createIdentifier(name);
};

const visitObject = (schema: OpenAPIV3.SchemaObject) => {
  const properties = schema.properties || {};
  const required = schema.required || [];

  const propertyParams = Object.entries(properties).reduce((acc, curr) => {
    const [key, value] = curr;
    const isRequired = required.includes(key);

    const expression = convertSchemaToExpression(value);

    if (!expression) {
      console.log(
        "[codegen-openapi] No expression for property",
        key,
        "skipping"
      );
      return acc;
    }

    acc[key] = expression;

    if (!isRequired) {
      acc[key] = zfs([[zodTokens.optional, acc[key]]]);
    }

    return acc;
  }, {} as Record<string, ts.Expression>);
  const params: any = [];
  params.push([zodTokens.object, propertyParams]);

  return zfs(params);
};

const visitArray = (schema: OpenAPIV3.ArraySchemaObject) => {
  const itemsSchema = schema.items;
  const params: any = [];
  params.push([zodTokens.array, convertSchemaToExpression(itemsSchema)]);
  return zfs(params);
};

const visitDefault = (schema: OpenAPIV3.SchemaObject) => {
  const params: any = [];

  if (schema.enum) {
    params.push([zodTokens.enum, schema.enum]);
  } else {
    const token = translateSymbol(schema.type!);
    params.push([token]);
  }

  if (schema.format) {
    if (schemaConfig.allowedFormats.includes(schema.format)) {
      params.push([schema.format]);
    } else {
      console.log(
        `[codegen-openapi] Unsupported format: ${schema.format} for type: ${schema.type}. Skipping...`
      );
    }
  }

  Object.entries(schema).forEach(([key, value]) => {
    if (schemaConfig.ignoredTokens.includes(key)) {
      return;
    }

    const token = translateSymbol(key);
    params.push([token, value]);
  });

  return zfs(params);
};

const visitOneOf = (schema: OpenAPIV3.SchemaObject) => {
  const params: any = [];

  if (schema.oneOf)
    params.push([
      zodTokens.union,
      schema.oneOf.map((item) => convertSchemaToExpression(item)),
    ]);

  return zfs(params);
};

const visitAllOfUsingIntersection = (schema: OpenAPIV3.SchemaObject) => {
  let finalExpression: ts.Expression | undefined;

  schema.allOf?.forEach((curr) => {
    const expression = convertSchemaToExpression(curr);

    if (!expression) {
      console.log("[codegen-openapi] Skipping empty allOf...");
      return;
    }

    if (!finalExpression) {
      finalExpression = expression;
      return;
    }

    finalExpression = zfs([
      [zodTokens.intersection, finalExpression, expression],
    ]);
  });

  return finalExpression;
};

const visitAllOfUsingAnd = (schema: OpenAPIV3.SchemaObject) => {
  let finalExpression: ReturnType<typeof zfs> | ts.Identifier | undefined;

  schema.allOf?.forEach((curr, idx) => {
    let expression = convertSchemaToExpression(curr);

    if (!expression) {
      console.log("[codegen-openapi] Skipping empty allOf...");
      return;
    }

    if (idx === 0) {
      finalExpression = expression;
      return;
    }

    if (!finalExpression) {
      return;
    }

    if ("_zfType" in expression) {
      const memberMethods = zodSubMemberCreators[expression._zfType];
      // @ts-ignore
      finalExpression = memberMethods.and(finalExpression, expression);
    }
  });

  return finalExpression;
};

const convertSchemaToExpression = (
  schema: Required<OpenAPIV3.ComponentsObject>["schemas"][string]
) => {
  const params: any = [];

  if (!schema) {
    throw new Error("No schema");
  }

  if ("$ref" in schema) {
    return visitRef(schema.$ref);
  }

  if (schema.oneOf) {
    return visitOneOf(schema);
  }

  if (schema.allOf) {
    return visitAllOfUsingAnd(schema);
  }

  if ("type" in schema) {
    if (schema.type === "object") {
      return visitObject(schema);
    }

    if (schema.type === "array") {
      return visitArray(schema);
    }

    return visitDefault(schema);
  }
};

const args = process.argv.slice(2);
const parsedArgs = parseArguments(args);
const schemaDestinations: string[] = parsedArgs.schemaDestinations;
const directory = parsedArgs.directory;
const statementsPerFile: Record<string, ts.Statement[]> = {};

const schemaExpressionsRegistry = new Map<string, ts.Expression>();

for (const schemaDestination of schemaDestinations) {
  const [fileName, expressionPattern = ".*"] = schemaDestination.split(":");

  const schemaFile =
    require(`${process.cwd()}/${directory}/${fileName}`) as OpenAPIV3.Document;

  const schemaExpressionNames = Object.keys(
    schemaFile["components"]?.schemas || {}
  ).filter((key) => new RegExp(`^${expressionPattern}$`).test(key));

  const queue = [...schemaExpressionNames];

  while (queue.length) {
    const schemaExpressionName = queue.shift()!;

    const componentSchema =
      schemaFile["components"]?.["schemas"]?.[schemaExpressionName];

    if (!componentSchema) {
      console.log(
        "[codegen-openapi] No component schema for",
        schemaExpressionName
      );
      continue;
    }

    try {
      const schemaExpression = convertSchemaToExpression(componentSchema);

      console.log(
        "[codegen-openapi] Generated schema for:",
        schemaExpressionName
      );

      statementsPerFile[fileName] = statementsPerFile[fileName] ?? [];

      const statements = statementsPerFile[fileName];

      if (statements.length === 0) {
        statements.push(createZodImport());
      }

      if (schemaExpression) {
        statements.push(
          createSchemaExport(schemaExpressionName, schemaExpression)
        );

        schemaExpressionsRegistry.set(schemaExpressionName, schemaExpression);
      }
    } catch (e) {
      if ((e as MissingRefError).isMissingRefError) {
        console.log("[codegen-openapi] Missing ref, pushing back to queue");
        queue.push(schemaExpressionName);
      } else {
        throw e;
      }
    }
  }
}

Object.entries(statementsPerFile).forEach(([fileName, statements]) => {
  // write the schema to the generated file
  writeStatementsToFile(statements, {
    header: "// generated file. do not edit.",
    filename: `${fileName}.generated.ts`,
    directory: "./generated",
  });
});
