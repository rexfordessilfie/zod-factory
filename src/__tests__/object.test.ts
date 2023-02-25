import { zfl } from "../core";
import { printNode } from "../utils";

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
});
