// generated file. do not edit.

import { z } from "zod";

export const name = z
  .string({
    required_error: "Name is required",
    invalid_type_error: "Name is invalid",
  })
  .min(10)
  .max(20);

export const age = z.number();

export const email = z.string().email();

export const person = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is invalid",
    })
    .min(10)
    .max(20),
  age: z.number(),
  emails: z.array(z.string().email()),
});
