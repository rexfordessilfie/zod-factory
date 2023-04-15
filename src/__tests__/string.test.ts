import { zf, printNode } from "..";

const baseExp = zf.string({ required_message: "required" });
const minFiveExp = zf.string.of.min(zf.string(), 5, "min5");
const maxTenExp = zf.string.of.max(zf.string(), 10, "max10");
const nonemptyExp = zf.string.of.nonempty(zf.string());
const startsWithExp = zf.string.of.startsWith(zf.string(), "startsWith");
const endsWithExp = zf.string.of.endsWith(zf.string(), "endsWith");
const emailExp = zf.string.of.email(zf.string());
const uuidExp = zf.string.of.uuid(zf.string());

// Source: https://github.com/colinhacks/zod/blob/master/src/__tests__/string.test.ts
const baseSchema = printNode(baseExp);
const minFiveSchema = printNode(minFiveExp);
const maxTenSchema = printNode(maxTenExp);
const nonemptySchema = printNode(nonemptyExp);
const startsWithASchema = printNode(startsWithExp);
const endsWithASchema = printNode(endsWithExp);
const emailSchema = printNode(emailExp);
const uuidSchema = printNode(uuidExp);

describe("string", () => {
  test("should have string zfType", () => {
    expect(baseExp._zfType).toBe("string");
    expect(minFiveExp._zfType).toBe("string");
    expect(maxTenExp._zfType).toBe("string");
  });

  test("should be correct zod string validator", () => {
    expect(baseSchema).toBe('z.string({ required_message: "required" })');
    expect(minFiveSchema).toBe('z.string().min(5, "min5")');
    expect(maxTenSchema).toBe('z.string().max(10, "max10")');
    expect(nonemptySchema).toBe("z.string().nonempty()");
    expect(startsWithASchema).toBe('z.string().startsWith("startsWith")');
    expect(endsWithASchema).toBe('z.string().endsWith("endsWith")');
    expect(emailSchema).toBe("z.string().email()");
    expect(uuidSchema).toBe("z.string().uuid()");
  });
});
