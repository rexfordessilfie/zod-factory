import { zf, printNode } from "..";

describe("number", () => {
  test("should have number zfType", () => {
    expect(zf.number()._zfType).toBe("number");
    expect(zf.number.of.min(zf.number(), 5)._zfType).toBe("number");
    expect(zf.number.of.gt(zf.number(), 5)._zfType).toBe("number");
    expect(zf.number.of.safe(zf.number())._zfType).toBe("number");
  });

  test("should produce correct output for existing number members", () => {
    expect(printNode(zf.number.of.min(zf.number(), 5))).toBe("z.number().min(5)");
    expect(printNode(zf.number.of.max(zf.number(), 10))).toBe("z.number().max(10)");
    expect(printNode(zf.number.of.int(zf.number()))).toBe("z.number().int()");
    expect(printNode(zf.number.of.positive(zf.number()))).toBe("z.number().positive()");
    expect(printNode(zf.number.of.negative(zf.number()))).toBe("z.number().negative()");
    expect(printNode(zf.number.of.nonnegative(zf.number()))).toBe("z.number().nonnegative()");
    expect(printNode(zf.number.of.nonpositive(zf.number()))).toBe("z.number().nonpositive()");
    expect(printNode(zf.number.of.multipleOf(zf.number(), 3))).toBe("z.number().multipleOf(3)");
    expect(printNode(zf.number.of.finite(zf.number()))).toBe("z.number().finite()");
  });

  test("should produce correct output for new number members", () => {
    expect(printNode(zf.number.of.gt(zf.number(), 5))).toBe("z.number().gt(5)");
    expect(printNode(zf.number.of.lt(zf.number(), 10))).toBe("z.number().lt(10)");
    expect(printNode(zf.number.of.gte(zf.number(), 5))).toBe("z.number().gte(5)");
    expect(printNode(zf.number.of.lte(zf.number(), 10))).toBe("z.number().lte(10)");
    expect(printNode(zf.number.of.step(zf.number(), 0.1))).toBe("z.number().step(0.1)");
    expect(printNode(zf.number.of.safe(zf.number()))).toBe("z.number().safe()");
  });

  test("should support chaining number members", () => {
    const chained = zf.number.of.min(zf.number.of.int(zf.number()), 0);
    expect(printNode(chained)).toBe("z.number().int().min(0)");
  });
});
