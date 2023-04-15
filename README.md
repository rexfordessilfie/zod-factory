# zod-factory
An abstraction of the Typescript Compiler API factory for generating zod validator expressions.

# Installation
You can install `zod-factory` with NPM, Yarn, pnpm or other package managers, for example:
```bash
npm install zod-factory     # NPM
pnpm install zod-factory    # PNPM
yarn add zod-factory        # Yarn
```

# Usage
You can use `zod-factory` to generate Typescript code for zod validator schemas as follows:

```typescript
import { zf, zfl, zfs } from "zod-factory";

const result = zf.printStatements([
  zf.zodImport(),

  // Using zf
  zf.schemaExport(
    "Person",
    zf.object({
      name: zf.string({ required_error: "Name is required" }),
      age: zf.number.t.nonnegative(
        zf.number({ required_error: "Age is required" })
      )
    })
  ),

  // Using zfl
  zf.schemaExport(
    "Car",
    zfl()
      .object({
        type: zfl().enum(["SUV", "Sedan", "Minivan"]).create(),
        color: zfl().string().optional().default("black").create()
      })
      .create()
  ),

  // Using zfs
  zf.schemaExport(
    "Book",
    zfs([
      [
        "object",
        {
          title: zfs([["string"], ["max", 40]]),
          author: zfs([["string", { required_error: "Author is required" }]])
        }
      ]
    ])
  )
]);

console.log(result);
```

**Generated Code**
```typescript
import { z } from "zod";

export const Person = z.object({
  name: z.string({ required_error: "Name is required" }),
  age: z.number({ required_error: "Age is required" }).nonnegative(),
});

export const Car = z.object({
  type: z.enum(["SUV", "Sedan", "Minivan"]),
  color: z.string().optional().default("black"),
});

export const Book = z.object({
  title: z.string().max(40),
  author: z.string({ required_error: "Author is required" }),
});
```

# Playground
The `playground` directory contains some early scripts for converting different validator/specification formats into zod validators.

## Scripts
Each of the playground scripts supports the following arguments:
```txt
codegen.ts [flags] [patterns]

Options:
  patterns             patterns to match files and expressions against. e.g "fileA:.*" "fileB:schema$" "fileC:^expression.*"
  
  Flags:
  -d, --directory <dir>  directory to search for files
```

## `codegen.ts`
This script generates Typescript code directly from zod validator  expressions created with `zf`, `zfs` or `zfl`. 

To run `codegen.ts` script, run the following, pointing it to the `sources` directory with the files and expressions:
```bash
$ cd playground
$ ts-node "./codegen/codegen.ts" -d "sources" "with-zf:.*" "with-zfl:.*" "with-zfs:.*"
```

## `codegen-custom.ts`
This generates zod validators from a "custom-format" I came up with for defining validation rules. This format is a POC for code generation from other validation specifications.

To run `codegen.ts` script, run the following, pointing it to the `sources` directory with the files containing custom-format expressions:
```bash
$ cd playground
$ ts-node "./codegen/codegen-custom.ts" -d "sources" "custom-schema:.*"
```

This custom format, explores references to other schemas defined earlier in the file. The reference is replaced with zod validator expression for the referenced schema.

**Example**

```typescript
export const name = {
  $kind: "string",
  $messages: {
    $required: "Name is required",
    $invalid: "Name is invalid",
  }
};

export const age = {
  $kind: "number",
};

export const email = {
  $kind: "string",
  $extensions: [{ $kind: "email" }],
};

export const person = {
  $refs: ["name", "age", "email"],
  $kind: "object",
  $fields: {
    name: "$ref:name", // Referencing name
    age: "$ref:age", // Referencing age
    emails: {
      $kind: "array",
      $element: "$ref:email", // Referencing email
    },
  },
};
```

**Generated Code**

```typescript
import { z } from "zod";

export const name = z
  .string({
    required_error: "Name is required",
    invalid_type_error: "Name is invalid",
  })

export const age = z.number();

export const email = z.string().email();

export const person = z.object({
  name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name is invalid",
    }),
  age: z.number(),
  emails: z.array(z.string().email()),
});
```

## `codegen-openapi.ts`
This script generates zod schemas from OpenAPI schema components. Similar to the above, this script
takes the `filename:schemaNameRegex` arguments, and generates zod schemas from the schema AST node definitions in the file that match the regex.

Run the script as follows, pointing it to the `sources` directory with the files containing custom-format expressions:

```bash
$ cd playground
$ ts-node "./codegen/codegen-openapi.ts" -d "sources" "openapi-schema:.*" 
```

For OpenApi schemas, references are resolved by replacing them with the name of the referenced schema. For example:

**Example**
```json
{
  "components": {
    "schemas": {
      "Emoji": {
        "type": "string",
        "format": "emoji",
        "description": "An emoji",
        "example": "👍",
        "maxLength": 1
      },
      "Person": {
        "description": "A person",
        "required": [
          "name",
          "age"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the person",
            "example": "John Doe"
          },
          "age": {
            "type": "number",
            "description": "The age of the person",
            "example": 30
          },
          "favoriteEmoji": {
            "$ref": "#/components/schemas/Emoji"
          }
        }
      }  
    }
  }
}
```

**Generated Code**

```typescript
import { z } from "zod";

export const Emoji = z.string().emoji().max(1).describe("An emoji");

export const Person = z.object({
  name: z.string().describe("The name of the person"),
  age: z.number().describe("The age of the person"),
  favoriteEmoji: z.optional(Emoji),
});
```

# Motivation
The Typescript Compiler API is very powerful, and heavily featured to handle a variety of use cases, but it can also be verbose, complex, difficult to extend, and very dissimilar from `zod`'s API. `zod-factory` aims to reduce this complexity by introducing abstractions on top of the TS Compiler API to make zod code generation simple, scriptable, extensible.

# Acknowledgements
This library was birthed from an independent study course project I am undertaking with my advisor, professor Garret Morris at the University of Iowa.




