import { zf, zfl, printNode } from "..";

const baseExp = zfl().object({}).create();
const optionalObjectExp = zfl().object({}).optional().create();
const objWithPropExp = zfl().object({ foo: zfl().string().create() }).create();
const initialOptionalObjExp = zfl()
  .optional(zfl().object({ foo: zfl().string().create() }).create())
  .create();

const baseSchema = printNode(baseExp);
const optionalObjectSchema = printNode(optionalObjectExp);
const objWithPropSchema = printNode(objWithPropExp);
const initialOptionalObjSchema = printNode(initialOptionalObjExp);

describe("object", () => {
  test("should have object zfType", () => {
    expect(baseExp._zfType).toBe("object");
    expect(optionalObjectExp._zfType).toBe("object");
    expect(objWithPropExp._zfType).toBe("object");
  });

  test("should be correct zod object validator", () => {
    expect(baseSchema).toBe("z.object({})");
    expect(optionalObjectSchema).toBe("z.object({}).optional()");
    expect(objWithPropSchema).toBe("z.object({ foo: z.string() })");
    expect(initialOptionalObjSchema).toBe(
      "z.optional(z.object({ foo: z.string() }))"
    );
  });

  test("should produce correct output for new object members", () => {
    expect(printNode(zf.object.of.passthrough(zf.object({})))).toBe("z.object({}).passthrough()");
    expect(printNode(zf.object.of.strip(zf.object({})))).toBe("z.object({}).strip()");
    expect(printNode(zf.object.of.keyof(zf.object({})))).toBe("z.object({}).keyof()");
    expect(printNode(zf.object.of.required(zf.object({})))).toBe("z.object({}).required()");
    expect(printNode(zf.object.of.pick(zf.object({}), { name: true }))).toBe("z.object({}).pick({ name: true })");
    expect(printNode(zf.object.of.omit(zf.object({}), { name: true }))).toBe("z.object({}).omit({ name: true })");
    expect(printNode(zf.object.of.extend(zf.object({}), { age: zf.number() }))).toBe("z.object({}).extend({ age: z.number() })");
    expect(printNode(zf.object.of.merge(zf.object({}), zf.object({})))).toBe("z.object({}).merge(z.object({}))");
    expect(printNode(zf.object.of.catchall(zf.object({}), zf.string()))).toBe("z.object({}).catchall(z.string())");
  });
});
