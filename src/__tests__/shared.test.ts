import { zf, printNode } from "..";

describe("shared members", () => {
  test("optional", () => {
    expect(printNode(zf.string.of.optional(zf.string()))).toBe("z.string().optional()");
    expect(printNode(zf.number.of.optional(zf.number()))).toBe("z.number().optional()");
  });

  test("nullable", () => {
    expect(printNode(zf.string.of.nullable(zf.string()))).toBe("z.string().nullable()");
  });

  test("nullish", () => {
    expect(printNode(zf.string.of.nullish(zf.string()))).toBe("z.string().nullish()");
  });

  test("describe", () => {
    expect(printNode(zf.string.of.describe(zf.string(), "a name"))).toBe('z.string().describe("a name")');
  });

  test("default", () => {
    expect(printNode(zf.string.of.default(zf.string(), "hello"))).toBe('z.string().default("hello")');
  });

  test("catch", () => {
    expect(printNode(zf.string.of.catch(zf.string(), "fallback"))).toBe('z.string().catch("fallback")');
  });

  test("transform", () => {
    expect(printNode(zf.number.of.transform(zf.number()))).toBe("z.number().transform()");
  });

  test("refine", () => {
    expect(printNode(zf.number.of.refine(zf.number()))).toBe("z.number().refine()");
  });

  test("superRefine", () => {
    expect(printNode(zf.number.of.superRefine(zf.number()))).toBe("z.number().superRefine()");
  });

  test("pipe", () => {
    expect(printNode(zf.string.of.pipe(zf.string()))).toBe("z.string().pipe()");
  });

  test("brand", () => {
    expect(printNode(zf.string.of.brand(zf.string()))).toBe("z.string().brand()");
  });

  test("array", () => {
    expect(printNode(zf.string.of.array(zf.string()))).toBe("z.string().array()");
  });

  test("or", () => {
    expect(printNode(zf.string.of.or(zf.string(), zf.number()))).toBe("z.string().or(z.number())");
  });

  test("and", () => {
    expect(printNode(zf.string.of.and(zf.string(), zf.number()))).toBe("z.string().and(z.number())");
  });
});
