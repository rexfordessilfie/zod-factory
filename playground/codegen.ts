import ts from "typescript";
import { writeStatementsToFile } from "../src/utils";
import { createSchemaExport, createZodImport } from "../src/utils/helpers";

const schemaDestinations = process.argv.slice(2);

const statementsPerFile: Record<string, ts.Statement[]> = {};

for (const schemaDestination of schemaDestinations) {
  const [fileName, expressionPattern = ".*"] = schemaDestination.split(":");

  const fileModule = require(`./${fileName}`);

  const schemaExpressionNames = Object.keys(fileModule).filter((key) =>
    new RegExp(`^${expressionPattern}$`).test(key)
  );

  for (const schemaExpressionName of schemaExpressionNames) {
    const schemaExpression = fileModule[schemaExpressionName];

    // Ignore expressions that are not of _zfType
    if (!schemaExpression._zfType) {
      continue;
    }

    statementsPerFile[fileName] = statementsPerFile[fileName] ?? [];

    const statements = statementsPerFile[fileName];

    if (statements.length === 0) {
      statements.push(createZodImport());
    }

    statements.push(createSchemaExport(schemaExpressionName, schemaExpression));
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
