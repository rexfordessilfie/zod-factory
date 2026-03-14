// generated file. do not edit.

import { z } from "zod";

export const HelloOrWorld = z.enum(["Hello", "World"]);

export const User = z.object({
  id: z.string().uuid().describe("The user's id"),
  username: z.string().describe("The user's username"),
  firstName: z.string().describe("The user's first name"),
  lastName: z.string().describe("The user's last name"),
  email: z.string().describe("The user's email"),
  password: z.string().describe("The user's password"),
  phone: z.string().describe("The user's phone number"),
  favoriteEmoji: z.optional(
    z.string().emoji().describe("User's favorite emoji")
  ),
});

export const Connection = z.object({
  username: z.string(),
  ipAddressV4: z.string().ip({ version: "v4" }),
  ipAddressV6: z.optional(z.string().ip({ version: "v6" })),
  userId: z.optional(z.string().uuid()),
});

export const NewPet = z.object({
  name: z.string(),
  tag: z.optional(z.string()),
});

export const Error = z.object({
  code: z.number().int().describe("The description of code"),
  message: z
    .string()
    .default("hello from message")
    .describe("The description of message"),
});

export const NullableTag = z
  .string()
  .nullable()
  .describe("An optional tag that can be null");

export const Metadata = z
  .object({ createdAt: z.optional(z.string().datetime()) })
  .catchall(z.string())
  .describe("Extensible metadata object");

export const StrictConfig = z
  .object({ key: z.string(), value: z.string() })
  .strict()
  .describe("A config object that does not allow extra properties");

export const NewPets = z.array(NewPet);

export const Pet = NewPet.and(z.object({ id: z.number().int() }));

export const PaginatedList = z
  .object({
    items: z.array(Pet).default([]).describe("The list of items"),
    total: z.number().int().multipleOf(1).describe("Total number of items"),
    page: z.number().int().gte(1).describe("Current page number"),
    pageSize: z.optional(
      z
        .number()
        .int()
        .multipleOf(5)
        .default(20)
        .describe("Number of items per page")
    ),
  })
  .describe("A paginated list of items");

export const PetOrError = z
  .union([Pet, Error])
  .describe("Either a pet or an error");

export const Pets = z.array(Pet).max(5);
