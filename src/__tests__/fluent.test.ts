import { zf, printNode } from "..";

describe("fluent API", () => {
  describe("string", () => {
    test("zf.string().email() should produce z.string().email()", () => {
      const exp = (zf.string() as any).email();
      expect(printNode(exp)).toBe("z.string().email()");
    });

    test("zf.string().min(5) should produce z.string().min(5)", () => {
      const exp = (zf.string() as any).min(5);
      expect(printNode(exp)).toBe("z.string().min(5)");
    });

    test("chained: zf.string().email().min(5)", () => {
      const exp = (zf.string() as any).email().min(5);
      expect(printNode(exp)).toBe("z.string().email().min(5)");
    });

    test("zf.string().trim().toLowerCase()", () => {
      const exp = (zf.string() as any).trim().toLowerCase();
      expect(printNode(exp)).toBe("z.string().trim().toLowerCase()");
    });

    test("zf.string().optional()", () => {
      const exp = (zf.string() as any).optional();
      expect(printNode(exp)).toBe("z.string().optional()");
    });

    test("zf.string().length(10)", () => {
      const exp = (zf.string() as any).length(10);
      expect(printNode(exp)).toBe("z.string().length(10)");
    });

    test("zf.string().datetime()", () => {
      const exp = (zf.string() as any).datetime();
      expect(printNode(exp)).toBe("z.string().datetime()");
    });

    test("zf.string().includes('hello')", () => {
      const exp = (zf.string() as any).includes("hello");
      expect(printNode(exp)).toBe('z.string().includes("hello")');
    });
  });

  describe("number", () => {
    test("zf.number().int()", () => {
      const exp = (zf.number() as any).int();
      expect(printNode(exp)).toBe("z.number().int()");
    });

    test("zf.number().int().positive()", () => {
      const exp = (zf.number() as any).int().positive();
      expect(printNode(exp)).toBe("z.number().int().positive()");
    });

    test("zf.number().gt(5)", () => {
      const exp = (zf.number() as any).gt(5);
      expect(printNode(exp)).toBe("z.number().gt(5)");
    });

    test("zf.number().min(0).max(100)", () => {
      const exp = (zf.number() as any).min(0).max(100);
      expect(printNode(exp)).toBe("z.number().min(0).max(100)");
    });

    test("zf.number().safe()", () => {
      const exp = (zf.number() as any).safe();
      expect(printNode(exp)).toBe("z.number().safe()");
    });
  });

  describe("object", () => {
    test("zf.object({}).partial()", () => {
      const exp = (zf.object({}) as any).partial();
      expect(printNode(exp)).toBe("z.object({}).partial()");
    });

    test("zf.object({}).strict()", () => {
      const exp = (zf.object({}) as any).strict();
      expect(printNode(exp)).toBe("z.object({}).strict()");
    });

    test("zf.object({}).passthrough()", () => {
      const exp = (zf.object({}) as any).passthrough();
      expect(printNode(exp)).toBe("z.object({}).passthrough()");
    });

    test("zf.object({}).pick({ name: true })", () => {
      const exp = (zf.object({}) as any).pick({ name: true });
      expect(printNode(exp)).toBe("z.object({}).pick({ name: true })");
    });
  });

  describe("date", () => {
    test("zf.date().min('2020-01-01')", () => {
      const exp = (zf.date() as any).min("2020-01-01");
      expect(printNode(exp)).toBe('z.date().min("2020-01-01")');
    });

    test("zf.date().optional()", () => {
      const exp = (zf.date() as any).optional();
      expect(printNode(exp)).toBe("z.date().optional()");
    });
  });

  describe("boolean", () => {
    test("zf.boolean().optional()", () => {
      const exp = (zf.boolean() as any).optional();
      expect(printNode(exp)).toBe("z.boolean().optional()");
    });

    test("zf.boolean().nullable()", () => {
      const exp = (zf.boolean() as any).nullable();
      expect(printNode(exp)).toBe("z.boolean().nullable()");
    });
  });

  describe("array", () => {
    test("zf.array(zf.string()).min(2)", () => {
      const exp = (zf.array(zf.string()) as any).min(2);
      expect(printNode(exp)).toBe("z.array(z.string()).min(2)");
    });

    test("zf.array(zf.string()).nonempty().max(5)", () => {
      const exp = (zf.array(zf.string()) as any).nonempty().max(5);
      expect(printNode(exp)).toBe("z.array(z.string()).nonempty().max(5)");
    });
  });

  describe("backward compatibility", () => {
    test("zf.string.of.email still works", () => {
      const exp = zf.string.of.email(zf.string());
      expect(printNode(exp)).toBe("z.string().email()");
    });

    test("zf.number.of.int still works", () => {
      const exp = zf.number.of.int(zf.number());
      expect(printNode(exp)).toBe("z.number().int()");
    });
  });
});
