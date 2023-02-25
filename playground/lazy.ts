import { zfl } from "../src/core";

export const expression = zfl()
  .object({
    name: zfl().string().max(20).create(),
    age: zfl().number().min(18).create(),
  })
  .create();

export const expression2 = zfl().coerce().string().create();
