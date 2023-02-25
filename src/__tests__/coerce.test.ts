import { zfl } from "../core";
import { printNode } from "../utils";

const coerceStringExp = zfl().coerce().string().create();
const coerceNumberExp = zfl().coerce().number().create();
const coerceBooleanExp = zfl().coerce().boolean().create();
const coerceBigintExp = zfl().coerce().bigint().create();
const coerceDateExp = zfl().coerce().date().create();

const coerceStringSchema = printNode(coerceStringExp);
const coerceNumberSchema = printNode(coerceNumberExp);
const coerceBooleanSchema = printNode(coerceBooleanExp);
const coerceBigintSchema = printNode(coerceBigintExp);
const coerceDateSchema = printNode(coerceDateExp);

describe("coerce", () => {
  test("should have correct zfType", () => {
    expect(coerceStringExp._zfType).toBe("string");
    expect(coerceNumberExp._zfType).toBe("number");
    expect(coerceBooleanExp._zfType).toBe("boolean");
    expect(coerceBigintExp._zfType).toBe("bigint");
    expect(coerceDateExp._zfType).toBe("date");
  });

  test("should be correct zod coerce validator", () => {
    expect(coerceStringSchema).toBe("z.coerce.string()");
    expect(coerceNumberSchema).toBe("z.coerce.number()");
    expect(coerceBooleanSchema).toBe("z.coerce.boolean()");
    expect(coerceBigintSchema).toBe("z.coerce.bigint()");
    expect(coerceDateSchema).toBe("z.coerce.date()");
  });
});
