import ts from "typescript";
import * as fs from "fs";
import * as path from "path";

import * as prettier from "prettier";

const defaultSourceFile = ts.createSourceFile(
  "default.ts",
  "",
  ts.ScriptTarget.Latest,
  false,
  ts.ScriptKind.TS
);

export const printNode = (
  node: ts.Node,
  sourceFile: ts.SourceFile = defaultSourceFile
) => {
  const printer = ts.createPrinter();
  const nodeText = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
  return nodeText;
};

type PrintStatementsOptions = {
  header?: string;
  format?: boolean;
};

type PrintStatementsToFileOptions = PrintStatementsOptions & {
  filename: string;
  directory: string;
};

const defaultOptions = {
  filename: "generated.ts",
  directory: "./",
  format: true
} as const satisfies PrintStatementsToFileOptions;

export const printStatements = (
  statements: ts.Statement[],
  options: PrintStatementsOptions = {},
  sourceFile = defaultSourceFile
) => {
  const { format, header } = {
    ...defaultOptions,
    ...options
  };

  const fileContents = statements.map((statement) =>
    printNode(statement, sourceFile)
  );

  if (header) {
    fileContents.unshift(header);
  }

  const result = fileContents.join("\n\n");

  const formatted = format
    ? prettier.format(result, { parser: "typescript" })
    : result;

  return formatted;
};

export const printStatementsToFile = (
  statements: ts.Statement[],
  options: PrintStatementsToFileOptions = defaultOptions
) => {
  const { filename, format, directory, header } = {
    ...defaultOptions,
    ...options
  };

  const sourceFile = ts.createSourceFile(
    filename,
    "",
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );

  const formatted = printStatements(
    statements,
    {
      format: format,
      header: header
    },
    sourceFile
  );

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  fs.writeFileSync(path.join(directory || "", filename), formatted);
};
