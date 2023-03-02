import ts from "typescript";
import {
  zfs,
  createSchemaExport,
  createZodImport,
  writeStatementsToFile,
} from "../dist";

const schemaDestinations = process.argv.slice(2);

const statementsPerFile: Record<string, ts.Statement[]> = {};

// WARNING: not fully featured, just a proof of concept
type CustomFormat = {
  $kind: string;
  $value?: string | number;
  $messages?: Partial<Record<"$required" | "$invalid", string>>;
  $extensions?: Array<CustomFormat>;
  $fields?: Record<string, CustomFormat | `$ref:${string}`>;
  $element?: CustomFormat | `$ref:${string}`;
  $members?: Array<CustomFormat | `$ref:${string}`>; // TODO: handle tuple, union, and possibly intersection as one class of things that can be handled the same way
  $refs?: string[];
};

function convertCustomFormatToSchemaExpression(
  customFormat: CustomFormat,
  schemaExpressionsSoFar: Record<string, ts.Expression>
) {
  return visitCustomFormat(customFormat);

  function buildZodRawCreateParams(customFormat: CustomFormat) {
    let params: Record<string, any> | undefined;

    if (customFormat?.$messages) {
      params = params ?? {};
      if (customFormat.$messages?.$required) {
        params.required_error = customFormat.$messages.$required;
      }

      if (customFormat.$messages?.$invalid) {
        params.invalid_type_error = customFormat.$messages.$invalid;
      }
    }

    return params;
  }

  function buildZfsObjectParam(customFormat: CustomFormat) {
    let data: any[] = [];
    const zodRawCreateParams = buildZodRawCreateParams(customFormat);

    const fields =
      customFormat.$fields &&
      Object.entries(customFormat.$fields).reduce((acc, [key, value]) => {
        if (typeof value === "string") {
          const name = value.replace("$ref:", "");
          acc[key] = schemaExpressionsSoFar[name];
        } else {
          acc[key] = visitCustomFormat(value);
        }
        return acc;
      }, {} as Record<string, any>);

    data = [customFormat.$kind, fields];
    zodRawCreateParams && data.push(zodRawCreateParams);
    return data;
  }

  function buildZfsListLikeParam(customFormat: CustomFormat) {
    let data: any[] = [];
    const zodRawCreateParams = buildZodRawCreateParams(customFormat);
    let element: any;

    if (!customFormat.$element) {
      throw new Error("Array must have an element");
    }

    if (typeof customFormat.$element === "string") {
      const name = customFormat.$element.replace("$ref:", "");
      element = schemaExpressionsSoFar[name];
    } else {
      element = visitCustomFormat(customFormat.$element);
    }

    data = [customFormat.$kind, element];
    zodRawCreateParams && data.push(zodRawCreateParams);
    return data;
  }

  function buildZfsValueLikeParam(customFormat: CustomFormat) {
    let data: any[] = [];
    const zodRawCreateParams = buildZodRawCreateParams(customFormat);

    data = [customFormat.$kind, customFormat.$value];
    zodRawCreateParams && data.push(zodRawCreateParams);
    return data;
  }

  function buildZfsParam(customFormat: CustomFormat) {
    let data: any[] = [];

    if (customFormat.$kind === "object") {
      return buildZfsObjectParam(customFormat);
    }

    if (customFormat.$kind === "array" || customFormat.$kind === "set") {
      return buildZfsListLikeParam(customFormat);
    }

    if (customFormat.$value) {
      return buildZfsValueLikeParam(customFormat);
    }

    const zodRawCreateParams = buildZodRawCreateParams(customFormat);
    data = [customFormat.$kind];
    zodRawCreateParams && data.push(zodRawCreateParams);

    return data;
  }

  function visitCustomFormat(customFormat: CustomFormat) {
    let zfsParams: any[] = [buildZfsParam(customFormat)];

    if (customFormat.$extensions) {
      const extensions = customFormat.$extensions.map(buildZfsParam);
      zfsParams = zfsParams.concat(extensions);
    }

    return zfs(zfsParams);
  }
}

for (const schemaDestination of schemaDestinations) {
  const [fileName, expressionPattern = ".*"] = schemaDestination.split(":");

  const fileModule = require(`./${fileName}`);

  const schemaExpressionNames = Object.keys(fileModule).filter((key) =>
    new RegExp(`^${expressionPattern}$`).test(key)
  );

  const queue = [...schemaExpressionNames];

  const schemaNamesSoFar = new Set<string>();
  const schemaExpressionsSoFar: Record<string, ts.Expression> = {};

  while (queue.length > 0) {
    const schemaExpressionName = queue.shift()!;
    const customFormat: CustomFormat = fileModule[schemaExpressionName];

    const allRefsGenerated =
      !customFormat.$refs ||
      customFormat.$refs.every((ref) => schemaNamesSoFar.has(ref));

    if (!allRefsGenerated) {
      queue.push(schemaExpressionName);
      continue;
    }

    // TODO: detect nonexistent ref and raise error
    const schemaExpression = convertCustomFormatToSchemaExpression(
      customFormat,
      schemaExpressionsSoFar
    );

    statementsPerFile[fileName] = statementsPerFile[fileName] ?? [];

    const statements = statementsPerFile[fileName];

    if (statements.length === 0) {
      statements.push(createZodImport());
    }

    statements.push(createSchemaExport(schemaExpressionName, schemaExpression));

    schemaNamesSoFar.add(schemaExpressionName);
    schemaExpressionsSoFar[schemaExpressionName] = schemaExpression;
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
