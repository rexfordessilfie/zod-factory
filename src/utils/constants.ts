import {
  z,
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodDiscriminatedUnion,
  ZodNumber,
  ZodObject,
  ZodSet,
  ZodString,
  ZodType,
  ZodUnion,
} from "zod";

type OnlyPublic<T> = {
  [K in keyof T as K extends `_${string}` ? never : K]: T[K];
};

type OnlyStartsWithLowercase<T> = {
  [K in keyof T as K extends `${Lowercase<string>}${string}` ? K : never]: T[K];
};

type OnlyReturningZodType<T> = {
  [K in keyof T as T[K] extends (...args: any) => ZodType ? K : never]: T[K];
};

export type OnlyMethods<T> = {
  [K in keyof T as T[K] extends (...args: any) => any ? K : never]: T[K];
};

type ZodDirectMembers = OnlyStartsWithLowercase<OnlyPublic<typeof z>>;
type ZodDirectTypeMembers = ZodDirectMembers;
type ZodTypeMembers = OnlyReturningZodType<OnlyPublic<ZodType>>;
type ZodStringMembers = OnlyReturningZodType<OnlyPublic<ZodString>>;
type ZodBooleanMembers = OnlyReturningZodType<OnlyPublic<ZodBoolean>>;
type ZodArrayMembers = OnlyReturningZodType<OnlyPublic<ZodArray<any>>>;
type ZodSetMembers = OnlyReturningZodType<OnlyPublic<ZodSet<any>>>;
type ZodNumberMembers = OnlyReturningZodType<OnlyPublic<ZodNumber>>;
type ZodDateMembers = OnlyReturningZodType<OnlyPublic<ZodDate>>;
type ZodObjectMembers = OnlyReturningZodType<OnlyPublic<ZodObject<any>>>;
type ZodUnionMembers = OnlyReturningZodType<OnlyPublic<ZodUnion<any>>>;
type ZodCoerceMembers = OnlyReturningZodType<OnlyPublic<(typeof z)["coerce"]>>;

type ZodDiscriminatedUnionMembers = OnlyPublic<ZodDiscriminatedUnion<any, any>>;

export const zodZ = "z" as const;
export const zodZod = "zod" as const;

export const zodSharedMembers = {
  or: "or",
  and: "and",
  array: "array",
  optional: "optional",
  nullable: "nullable",
  nullish: "nullish",
  promise: "promise",
  default: "default",
  transform: "transform",
  brand: "brand", // will take some effort to actually do this
  catch: "catch", // just for handling defaults
  refine: "refine",
  describe: "describe",
  parse: "parse",
  pipe: "pipe",
  refinement: "refinement",
  superRefine: "superRefine",
} as const satisfies Record<keyof ZodTypeMembers, string>;

export const zodDirectMembers = {
  any: "any",
  bigint: "bigint",
  boolean: "boolean",
  date: "date",
  function: "function",
  never: "never",
  null: "null",
  number: "number",
  string: "string",
  symbol: "symbol",
  undefined: "undefined",
  unknown: "unknown",
  void: "void",
  custom: "custom",
  nan: "nan",
  oboolean: "oboolean",
  onumber: "onumber",
  ostring: "ostring",
  coerce: "coerce",

  // Maybe the ones that require arguments as non-primitive
  array: "array",
  discriminatedUnion: "discriminatedUnion",
  enum: "enum",
  effect: "effect",
  instanceof: "instanceof",
  intersection: "intersection",
  lazy: "lazy",
  literal: "literal",
  map: "map",
  nativeEnum: "nativeEnum",
  nullable: "nullable",
  object: "object",
  optional: "optional",
  pipeline: "pipeline",
  preprocess: "preprocess",
  promise: "promise",
  record: "record",
  set: "set",
  strictObject: "strictObject",
  transformer: "transformer",
  tuple: "tuple",
  union: "union",
} as const satisfies Partial<Record<keyof ZodDirectTypeMembers, string>>;

export const zodStringMembers = {
  uuid: "uuid",
  email: "email",
  url: "url",
  regex: "regex",
  length: "length",
  min: "min",
  max: "max",
  cuid: "cuid",
  cuid2: "cuid2",
  startsWith: "startsWith",
  endsWith: "endsWith",
  trim: "trim",
  datetime: "datetime",
  nonempty: "nonempty",
  ip: "ip",
  emoji: "emoji",
  toLowerCase: "toLowerCase",
  toUpperCase: "toUpperCase",
  ulid: "ulid",
  includes: "includes",
  ...zodSharedMembers,
} as const satisfies Record<keyof ZodStringMembers, string>;

export const zodNumberMembers = {
  gt: "gt",
  lt: "lt",
  gte: "gte",
  lte: "lte",
  int: "int",
  min: "min",
  max: "max",
  step: "step",
  positive: "positive",
  nonnegative: "nonnegative",
  negative: "negative",
  nonpositive: "nonpositive",
  multipleOf: "multipleOf",
  finite: "finite",
  safe: "safe",
  ...zodSharedMembers,
} as const satisfies Record<keyof ZodNumberMembers, string>;

export const zodDateMembers = {
  min: "min",
  max: "max",
  ...zodSharedMembers,
} as const satisfies Record<keyof ZodDateMembers, string>;

export const zodCoerceMembers = {
  string: "string",
  number: "number",
  boolean: "boolean",
  date: "date",
  bigint: "bigint",
} as const satisfies Record<keyof ZodCoerceMembers, string>;

export const zodArrayMembers = {
  nonempty: "nonempty",
  min: "min",
  max: "max",
  length: "length",
  element: "element",
  ...zodSharedMembers,
} as const satisfies Record<keyof ZodArrayMembers, string>;

export const zodBooleanMembers = {
  ...zodSharedMembers,
} as const satisfies Record<keyof ZodBooleanMembers, string>;

export const zodSetMembers = {
  min: "min",
  max: "max",
  nonempty: "nonempty",
  size: "size",
  ...zodSharedMembers,
} as const satisfies Record<keyof ZodSetMembers, string>;

export const zodUnionMembers = {
  options: "options",
  ...zodSharedMembers,
} as const satisfies Record<keyof ZodUnionMembers, string>;

export const zodObjectMembers = {
  augment: "augment",
  catchall: "catchall",
  deepPartial: "deepPartial",
  extend: "extend",
  keyof: "keyof",
  merge: "merge",
  omit: "omit",
  nonstrict: "nonstrict",
  partial: "partial",
  pick: "pick",
  strict: "strict",
  passthrough: "passthrough",
  required: "required",
  setKey: "setKey",
  shape: "shape",
  strip: "strip",
  ...zodSharedMembers,
} as const satisfies Record<keyof ZodObjectMembers, string>;

export const zodExtraMembers = {
  coerce: "coerce",
  late: "late",
} as const satisfies Partial<Record<keyof typeof z, string>>;

export const zodTokens = {
  ...zodDirectMembers,
  ...zodStringMembers,
  ...zodNumberMembers,
  ...zodDateMembers,
  ...zodArrayMembers,
  ...zodSetMembers,
  ...zodSharedMembers,
  ...zodObjectMembers,
  ...zodExtraMembers,
  ...zodCoerceMembers,
  ...zodBooleanMembers,
} as const;
