// generated file. do not edit.

import { z } from "zod";

export const expression = z.object({
  name: z.string().min(20),
  age: z.number().max(18),
});

export const expression2 = z.coerce.string();
