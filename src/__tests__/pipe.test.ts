import ts from "typescript";
import { zfl } from "..";
import { printNode } from "..";

const realFunc = (val: number) => val.toString();

const transpiledFuncOutput = ts.transpileModule(
  "(val: number) => val.toString()",
  {}
);

// Source: https://github.com/colinhacks/zod/blob/master/src/__tests__/array.test.ts
const expression1 = zfl()
  .string()
  .transform(realFunc)
  .pipe(zfl().number().min(5).create())
  .create();

const expression2 = zfl()
  .string()
  .transform(eval(transpiledFuncOutput.outputText))
  .pipe(zfl().number().min(5).create())
  .create();

const expression3 = zfl()
  .string()
  .transform(ts.factory.createIdentifier("realFunc"))
  .pipe(zfl().number().min(5).create())
  .create();

const expression1Schema = printNode(expression1);
const expression2Schema = printNode(expression2);
const expression3Schema = printNode(expression3);

describe("pipe", () => {
  test("should have array zfType", () => {
    expect(expression1._zfType).toBe("pipe");
  });

  test("should be correct zod array validator", () => {
    expect(expression1Schema).toBe(
      "z.string().transform((val) => val.toString()).pipe(z.number().min(5))"
    );

    expect(expression2Schema).toBe(
      "z.string().transform(function (val) { return val.toString(); }).pipe(z.number().min(5))"
    );

    expect(expression3Schema).toBe(
      "z.string().transform(realFunc).pipe(z.number().min(5))"
    );
  });
});
