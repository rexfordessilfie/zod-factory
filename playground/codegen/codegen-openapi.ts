import { OpenAPIV3 } from "openapi-types";
import ts from "typescript";
import {
  createSchemaExport,
  createZodImport,
  writeStatementsToFile,
  zfs,
  zodSharedMemberCreators,
  zodTokens,
} from "../../dist";
import { parseArguments } from "./helpers";

class MissingRefError extends Error {
  isMissingRefError = true;
  constructor(message: string) {
    super(message);
  }
}

const sharedTokens = {
  default: "catch",
  description: "describe",
} satisfies Partial<
  Record<keyof OpenAPIV3.SchemaObject, keyof typeof zodTokens>
>;

const stringFormats = {
  date: "date",
  "date-time": "date",
  email: "email",
  ipv4: "ip",
  ipv6: "ip",
  uri: "url",
  uuid: "uuid",
} satisfies Partial<Record<string, keyof typeof zodTokens>>;

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

  if (schema.maxItems) {
    params.push([zodTokens.max, schema.maxItems]);
  }

  if (schema.minItems) {
    params.push([zodTokens.min, schema.minItems]);
  }

  return zfs(params);
};

const extendSharedParams = (schema: OpenAPIV3.SchemaObject, params: any[]) => {
  // Add the chained shared methods
  Object.keys(sharedTokens).forEach((key) => {
    const token = sharedTokens[key as keyof typeof sharedTokens];
    const value = (schema as any)[key];

    if (value !== undefined) {
      params.push([token, value]);
    }
  });
};

const visitString = (schema: OpenAPIV3.SchemaObject) => {
  const params: any = [];

  params.push([zodTokens.string]);

  if (schema.format) {
    const format = stringFormats[schema.format as keyof typeof stringFormats];
    if (format) {
      params.push([format]);
    } else {
      console.log(
        `[codegen-openapi] Unsupported format: ${schema.format} for type: ${schema.type}. Skipping...`
      );
    }
  }

  if (schema.pattern) {
    params.push([zodTokens.regex, schema.pattern]);
  }

  if (schema.minLength) {
    params.push([zodTokens.min, schema.minLength]);
  }

  if (schema.maxLength) {
    params.push([zodTokens.max, schema.maxLength]);
  }

  extendSharedParams(schema, params);

  return zfs(params);
};

const visitEnum = (schema: OpenAPIV3.SchemaObject) => {
  const params: any = [];
  params.push([zodTokens.enum, schema.enum]);

  extendSharedParams(schema, params);
  return zfs(params);
};

const visitNumber = (schema: OpenAPIV3.SchemaObject) => {
  const params: any = [];

  params.push([zodTokens.number]);

  if (schema.type === "integer") {
    params.push([zodTokens.int]);
  }

  if (schema.minimum) {
    if (schema.exclusiveMinimum) {
      params.push([zodTokens.gt, schema.minimum]);
    } else {
      params.push([zodTokens.gte, schema.minimum]);
    }
  }

  if (schema.maximum) {
    if (schema.exclusiveMaximum) {
      params.push([zodTokens.lt, schema.maximum]);
    } else {
      params.push([zodTokens.lte, schema.maximum]);
    }
  }

  extendSharedParams(schema, params);
  return zfs(params);
};

const visitBoolean = (schema: OpenAPIV3.SchemaObject) => {
  const params: any = [];
  params.push([zodTokens.boolean]);

  extendSharedParams(schema, params);
  return zfs(params);
};

const visitOneOf = (schema: OpenAPIV3.SchemaObject) => {
  const params: any = [];

  if (schema.oneOf)
    params.push([
      zodTokens.union,
      schema.oneOf.map((item) => convertSchemaToExpression(item)),
    ]);

  extendSharedParams(schema, params);
  return zfs(params);
};

const visitAllOf = (schema: OpenAPIV3.SchemaObject) => {
  const expressions = schema.allOf?.map((item) =>
    convertSchemaToExpression(item)
  ) as (ts.Expression & { _zfType: string })[];

  if (!expressions) {
    console.log("[codegen-openapi] Skipping empty allOf...");
    return;
  }

  const [first, ...rest] = expressions.filter((item) => !!item);

  const expression = rest.reduce((acc, curr) => {
    return zodSharedMemberCreators.and(acc, curr);
  }, first);

  return expression;
};

const convertSchemaToExpression = (
  schema: Required<OpenAPIV3.ComponentsObject>["schemas"][string]
) => {
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
    return visitAllOf(schema);
  }

  if ("type" in schema) {
    if (schema.type === "object") {
      return visitObject(schema);
    }

    if (schema.type === "array") {
      return visitArray(schema);
    }

    if (schema.enum) {
      return visitEnum(schema);
    }

    if (schema.type === "string") {
      return visitString(schema);
    }

    if (schema.type === "number" || schema.type === "integer") {
      return visitNumber(schema);
    }

    if (schema.type === "boolean") {
      return visitBoolean(schema);
    }

    return zfs([[zodTokens.unknown]]);
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
