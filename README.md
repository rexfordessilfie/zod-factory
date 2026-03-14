# zod-factory

TypeScript Compiler API factory abstractions for generating [Zod](https://zod.dev) validator expressions.

`zod-factory` wraps the verbose TypeScript Compiler API with a concise, Zod-like interface so you can **programmatically generate** type-safe Zod schemas as TypeScript source code.

## Installation

```bash
npm install zod-factory
```

## Quick Start

```typescript
import { zf } from "zod-factory";

const result = zf.printStatements([
  zf.zodImport(),

  zf.schemaExport(
    "Person",
    zf.object({
      name: zf.string().email(),
      age: zf.number().int().nonnegative(),
    })
  ),
]);

console.log(result);
```

**Output:**

```typescript
import { z } from "zod";

export const Person = z.object({
  name: z.string().email(),
  age: z.number().int().nonnegative(),
});
```

## APIs

`zod-factory` offers three ways to build schemas, each suited to different use cases.

### `zf` — Fluent API

The primary API. Chain methods directly on type creators, just like Zod itself.

```typescript
import { zf } from "zod-factory";

// Fluent chaining
zf.string().email().min(5)

// With error messages
zf.string({ required_error: "Name is required" })

// Nested schemas
zf.object({
  name: zf.string().min(1),
  tags: zf.array(zf.string()).nonempty(),
  role: zf.enum(["admin", "user"]),
})
```

#### Factory-style (`zf.TYPE.of`)

Every type also exposes a `.of` namespace for a functional, wrapping style:

```typescript
// These are equivalent:
zf.string().email().min(5)
zf.string.of.min(zf.string.of.email(zf.string()), 5)
```

The fluent style is typically preferred, but `.of` can be useful when composing schemas programmatically.

### `zfl` — Builder API

A step-by-step builder that finalizes with `.create()`.

```typescript
import { zfl } from "zod-factory";

zfl()
  .object({
    type: zfl().enum(["SUV", "Sedan", "Minivan"]).create(),
    color: zfl().string().optional().default("black").create(),
  })
  .create()
```

### `zfs` — Array API

A data-driven format where schemas are defined as arrays of `[method, ...args]` tuples.

```typescript
import { zfs } from "zod-factory";

zfs([
  ["object", {
    title: zfs([["string"], ["max", 40]]),
    author: zfs([["string", { required_error: "Author is required" }]]),
  }],
])
```

This format is useful when schemas are loaded from configuration files or generated dynamically.

## Supported Types

### String

```typescript
zf.string()
```

| Method | Example |
|---|---|
| `min(n)` | `zf.string().min(3)` |
| `max(n)` | `zf.string().max(255)` |
| `length(n)` | `zf.string().length(10)` |
| `email()` | `zf.string().email()` |
| `url()` | `zf.string().url()` |
| `uuid()` | `zf.string().uuid()` |
| `cuid()` | `zf.string().cuid()` |
| `cuid2()` | `zf.string().cuid2()` |
| `ulid()` | `zf.string().ulid()` |
| `regex(pattern)` | `zf.string().regex(/^[a-z]+$/)` |
| `trim()` | `zf.string().trim()` |
| `nonempty()` | `zf.string().nonempty()` |
| `startsWith(s)` | `zf.string().startsWith("https")` |
| `endsWith(s)` | `zf.string().endsWith(".com")` |
| `ip()` | `zf.string().ip()` |
| `emoji()` | `zf.string().emoji()` |
| `datetime()` | `zf.string().datetime()` |
| `toLowerCase()` | `zf.string().toLowerCase()` |
| `toUpperCase()` | `zf.string().toUpperCase()` |
| `includes(s)` | `zf.string().includes("test")` |

### Number

```typescript
zf.number()
```

| Method | Example |
|---|---|
| `min(n)` | `zf.number().min(0)` |
| `max(n)` | `zf.number().max(100)` |
| `int()` | `zf.number().int()` |
| `positive()` | `zf.number().positive()` |
| `negative()` | `zf.number().negative()` |
| `nonnegative()` | `zf.number().nonnegative()` |
| `nonpositive()` | `zf.number().nonpositive()` |
| `multipleOf(n)` | `zf.number().multipleOf(5)` |
| `finite()` | `zf.number().finite()` |
| `gt(n)` | `zf.number().gt(0)` |
| `lt(n)` | `zf.number().lt(100)` |
| `gte(n)` | `zf.number().gte(1)` |
| `lte(n)` | `zf.number().lte(99)` |
| `step(n)` | `zf.number().step(0.5)` |
| `safe()` | `zf.number().safe()` |

### Object

```typescript
zf.object({ key: zf.string() })
```

| Method | Example |
|---|---|
| `partial()` | `zf.object({...}).partial()` |
| `required()` | `zf.object({...}).required()` |
| `strict()` | `zf.object({...}).strict()` |
| `nonstrict()` | `zf.object({...}).nonstrict()` |
| `deepPartial()` | `zf.object({...}).deepPartial()` |
| `passthrough()` | `zf.object({...}).passthrough()` |
| `strip()` | `zf.object({...}).strip()` |
| `keyof()` | `zf.object({...}).keyof()` |
| `pick(keys)` | `zf.object({...}).pick({ name: true })` |
| `omit(keys)` | `zf.object({...}).omit({ age: true })` |
| `extend(shape)` | `zf.object({...}).extend({ role: zf.string() })` |
| `augment(shape)` | Alias for `extend` |
| `merge(schema)` | `zf.object({...}).merge(otherSchema)` |
| `catchall(schema)` | `zf.object({...}).catchall(zf.string())` |
| `setKey(k, v)` | `zf.object({...}).setKey("id", zf.number())` |

### Array

```typescript
zf.array(zf.string())
```

| Method | Example |
|---|---|
| `min(n)` | `zf.array(zf.string()).min(1)` |
| `max(n)` | `zf.array(zf.string()).max(10)` |
| `length(n)` | `zf.array(zf.string()).length(3)` |
| `nonempty()` | `zf.array(zf.string()).nonempty()` |
| `element(s)` | `zf.array(zf.string()).element(zf.number())` |

### Date

```typescript
zf.date()
```

| Method | Example |
|---|---|
| `min(date)` | `zf.date().min(new Date("2020-01-01"))` |
| `max(date)` | `zf.date().max(new Date("2030-01-01"))` |

### Set

```typescript
zf.set(zf.string())
```

| Method | Example |
|---|---|
| `min(n)` | `zf.set(zf.string()).min(1)` |
| `max(n)` | `zf.set(zf.string()).max(5)` |
| `size(n)` | `zf.set(zf.string()).size(3)` |
| `nonempty()` | `zf.set(zf.string()).nonempty()` |

### Other Types

These types support shared methods only (see below):

```typescript
zf.boolean()
zf.date()
zf.bigint()
zf.any()
zf.unknown()
zf.literal("value")
zf.enum(["A", "B", "C"])
zf.union([zf.string(), zf.number()])
zf.discriminatedUnion("type", [...])
zf.intersection(zf.string(), zf.number())
zf.tuple([zf.string(), zf.number()])
zf.record(zf.string())
zf.map(zf.string(), zf.number())
zf.promise(zf.string())
zf.custom(fn)
zf.lazy(fn)
zf.nan()
zf.never()
zf.null()
zf.undefined()
zf.void()
zf.symbol()
zf.function()
zf.nativeEnum(enumRef)
zf.instanceof(classRef)
zf.preprocess(fn, schema)
zf.pipeline(schema, schema)
zf.effect(schema)
zf.transformer(schema)
zf.optional(schema)
zf.nullable(schema)
zf.oboolean()
zf.onumber()
zf.ostring()
zf.strictObject(shape)
```

### Coerce

Wrap types with `zf.coerce` to generate `z.coerce.*` expressions:

```typescript
zf.coerce.of.string()   // z.coerce.string()
zf.coerce.of.number()   // z.coerce.number()
zf.coerce.of.boolean()  // z.coerce.boolean()
zf.coerce.of.date()     // z.coerce.date()
zf.coerce.of.bigint()   // z.coerce.bigint()
```

### Shared Methods

These methods are available on **all** types:

| Method | Description |
|---|---|
| `optional()` | Allow `undefined` |
| `nullable()` | Allow `null` |
| `nullish()` | Allow `null` or `undefined` |
| `describe(text)` | Add a description |
| `default(value)` | Set a default value |
| `catch(value)` | Set a catch/fallback value |
| `transform(fn)` | Apply a transformation |
| `refine(fn)` | Add a custom refinement |
| `superRefine(fn)` | Add a custom superRefine |
| `pipe(schema)` | Pipe through another schema |
| `brand(name?)` | Brand the type |
| `array()` | Wrap in an array |
| `or(schema)` | Create a union |
| `and(schema)` | Create an intersection |
| `promise()` | Wrap in a Promise |

## Utilities

### `zf.zodImport()`

Generates the Zod import statement:

```typescript
zf.zodImport()
// → import { z } from "zod"
```

### `zf.schemaExport(name, schema)`

Generates an exported const declaration:

```typescript
zf.schemaExport("User", zf.object({ name: zf.string() }))
// → export const User = z.object({ name: z.string() })
```

### `zf.printStatements(statements, options?)`

Prints an array of AST statements to a formatted TypeScript string:

```typescript
const code = zf.printStatements([
  zf.zodImport(),
  zf.schemaExport("Name", zf.string()),
], { header: "// Auto-generated\n", format: true })
```

### `zf.printStatementsToFile(statements, options)`

Writes generated code directly to a file:

```typescript
zf.printStatementsToFile([
  zf.zodImport(),
  zf.schemaExport("Name", zf.string()),
], { filename: "schema.ts", directory: "./generated" })
```

### `zf.printNode(node)`

Converts a single AST node to a TypeScript string.

### `zf.convertToExpression(value)`

Converts a JavaScript value (primitives, arrays, objects) to a TypeScript AST expression.

## Full Example

```typescript
import { zf } from "zod-factory";

const code = zf.printStatements([
  zf.zodImport(),

  zf.schemaExport(
    "Address",
    zf.object({
      street: zf.string().min(1),
      city: zf.string(),
      zip: zf.string().regex(/^\d{5}$/),
      country: zf.string().default("US"),
    })
  ),

  zf.schemaExport(
    "User",
    zf.object({
      id: zf.string().uuid(),
      email: zf.string().email(),
      name: zf.string().min(1).max(100),
      age: zf.number().int().nonnegative().optional(),
      role: zf.enum(["admin", "user", "guest"]),
      tags: zf.array(zf.string()).nonempty(),
      createdAt: zf.coerce.of.date(),
    })
  ),
]);

console.log(code);
```

**Output:**

```typescript
import { z } from "zod";

export const Address = z.object({
  street: z.string().min(1),
  city: z.string(),
  zip: z.string().regex(/^\d{5}$/),
  country: z.string().default("US"),
});

export const User = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().nonnegative().optional(),
  role: z.enum(["admin", "user", "guest"]),
  tags: z.array(z.string()).nonempty(),
  createdAt: z.coerce.date(),
});
```

## Playground

The `playground/` directory contains scripts for code generation from different formats:

- **`codegen.ts`** — Generate code from `zf`, `zfl`, and `zfs` expressions
- **`codegen-custom.ts`** — Generate Zod schemas from a custom validation format (supports cross-references)
- **`codegen-openapi.ts`** — Generate Zod schemas from OpenAPI schema components

```bash
cd playground
ts-node "./codegen/codegen.ts" -d "sources" "with-zf:.*"
ts-node "./codegen/codegen-openapi.ts" -d "sources" "openapi-schema:.*"
```

## Motivation

The TypeScript Compiler API is powerful but verbose and dissimilar from Zod's API. `zod-factory` reduces this complexity with a concise, Zod-like interface that makes code generation simple, type-safe, and extensible.

## Acknowledgements

This library was birthed from an independent study course project with advisor professor Garret Morris at the University of Iowa.

## License

MIT
