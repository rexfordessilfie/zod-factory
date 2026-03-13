import { zf, printNode } from "..";

describe("date", () => {
  test("should have date zfType", () => {
    expect(zf.date()._zfType).toBe("date");
    expect(zf.date.of.min(zf.date(), new Date("2020-01-01"))._zfType).toBe("date");
    expect(zf.date.of.max(zf.date(), new Date("2025-01-01"))._zfType).toBe("date");
  });

  test("should produce correct output for base date", () => {
    expect(printNode(zf.date())).toBe("z.date()");
  });

  test("should produce correct output for date members", () => {
    const minExp = zf.date.of.min(zf.date(), "2020-01-01");
    expect(printNode(minExp)).toBe('z.date().min("2020-01-01")');

    const maxExp = zf.date.of.max(zf.date(), "2025-01-01");
    expect(printNode(maxExp)).toBe('z.date().max("2025-01-01")');
  });

  test("should support shared members on date", () => {
    const optionalDate = zf.date.of.optional(zf.date());
    expect(printNode(optionalDate)).toBe("z.date().optional()");

    const nullableDate = zf.date.of.nullable(zf.date());
    expect(printNode(nullableDate)).toBe("z.date().nullable()");
  });
});
