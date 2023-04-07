import { zf } from "../../dist";

export const expression = zf.object({
  name: zf.string.t.max(zf.string(), 20),
  age: zf.number.t.min(zf.number(), 18)
});

export const expression2 = zf.coerce.t.string(zf.coerce());
