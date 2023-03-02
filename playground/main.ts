import { zf } from "../dist";

export const expression = zf.object({
  name: zf.stringMethods.max(zf.string(), 20),
  age: zf.numberMethods.min(zf.number(), 18),
});

export const expression2 = zf.coerceMethods.string(zf.coerce());
