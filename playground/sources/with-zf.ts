import { zf } from "../../dist";

export const expression = zf.object({
  name: zf.string.of.max(zf.string(), 20),
  age: zf.number.of.min(zf.number(), 18)
});

export const expression2 = zf.coerce.of.string(zf.coerce());
