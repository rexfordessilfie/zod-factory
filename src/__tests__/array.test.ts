import { zfl } from "..";
import { printNode } from "..";

const minTwoExp = zfl().string().array().min(2).create();
const maxTwoExp = zfl().string().array().max(2).create();
const justTwoExp = zfl().string().array().length(2).create();
const intNumExp = zfl().string().array().nonempty().create();
const nonEmptyMaxExp = zfl().string().array().nonempty().max(2).create();
const nullishExp = zfl().string().array().nullish().create();

const minTwoSchema = printNode(minTwoExp);
const maxTwoSchema = printNode(maxTwoExp);
const justTwoSchema = printNode(justTwoExp);
const intNumSchema = printNode(intNumExp);
const nonEmptyMaxSchema = printNode(nonEmptyMaxExp);
const nullishSchema = printNode(nullishExp);

describe("array", () => {
  test("should have array zfType", () => {
    expect(minTwoExp._zfType).toBe("array");
    expect(maxTwoExp._zfType).toBe("array");
    expect(justTwoExp._zfType).toBe("array");
    expect(intNumExp._zfType).toBe("array");
    expect(nonEmptyMaxExp._zfType).toBe("array");
  });

  test("should be correct zod array validator", () => {
    expect(minTwoSchema).toBe("z.string().array().min(2)");
    expect(maxTwoSchema).toBe("z.string().array().max(2)");
    expect(justTwoSchema).toBe("z.string().array().length(2)");
    expect(intNumSchema).toBe("z.string().array().nonempty()");
    expect(nonEmptyMaxSchema).toBe("z.string().array().nonempty().max(2)");
    expect(nullishSchema).toBe("z.string().array().nullish()");
  });
});
