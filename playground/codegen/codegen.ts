import ts from "typescript";
import {
  schemaExport,
  zodImport,
  printStatementsToFile,
} from "../../dist";
import { parseArguments } from "./helpers";

const args = process.argv.slice(2);
const parsedArgs = parseArguments(args);
const schemaDestinations: string[] = parsedArgs.schemaDestinations;
const directory = parsedArgs.directory;

const statementsPerFile: Record<string, ts.Statement[]> = {};

for (const schemaDestination of schemaDestinations) {
  const [fileName, expressionPattern = ".*"] = schemaDestination.split(":");

  const fileModule = require(`${process.cwd()}/${directory}/${fileName}`);

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
      statements.push(zodImport());
    }

    statements.push(schemaExport(schemaExpressionName, schemaExpression));
  }
}

Object.entries(statementsPerFile).forEach(([fileName, statements]) => {
  // write the schema to the generated file
  printStatementsToFile(statements, {
    header: "// generated file. do not edit.",
    filename: `${fileName}.generated.ts`,
    directory: "./generated",
  });
});
