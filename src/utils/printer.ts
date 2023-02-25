import ts from "typescript";
import * as fs from "fs";
import * as path from "path";

import * as prettier from "prettier";

export const printNode = (node: ts.Node, sourceFile: ts.SourceFile) => {
  const printer = ts.createPrinter();
  const nodeText = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
  return nodeText;
};

type WriteStatementsToFileOptions = {
  header?: string;
  filename: string;
  directory: string;
  format?: boolean;
};

const defaultOptions = {
  filename: "generated.ts",
  directory: "./",
  format: true,
} as const satisfies WriteStatementsToFileOptions;

export const writeStatementsToFile = (
  statements: ts.Statement[],
  options: WriteStatementsToFileOptions = defaultOptions
) => {
  const { filename, format, directory, header } = {
    ...defaultOptions,
    ...options,
  };

  const sourceFile = ts.createSourceFile(
    filename,
    "",
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );
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

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  fs.writeFileSync(path.join(directory || "", filename), formatted);
};
