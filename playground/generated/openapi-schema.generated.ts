// generated file. do not edit.

import { z } from "zod";

export const Hello = z.enum(["Hello", "World"]);

export const NewPet = z.object({
  name: z.string(),
  tag: z.optional(z.string()),
});

export const Error = z.object({
  code: z.number().int().lt(10).describe("The description of code"),
  message: z
    .string()
    .catch("hello from message")
    .describe("The description of message"),
});

export const Pet = NewPet.and(z.object({ id: z.number().int() }));
