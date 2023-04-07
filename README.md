# zod-factory
An abstraction of the Typescript Compiler API factory for generating zod validator expressions.

## Why zod-factory?
The Typescript Compiler API is very powerful, and heavily featured to handle a variety of use cases, but it can also be overwhelming to work with directly. 

For example, consider the zod schema below, and the corresponding Typescript compiler factory API code to generate the AST representation of this schema.

**zod Validator**
```typescript
const person = z.object({
  name: z.string(),
  age: z.number(),
});
```

**Typescript Compiler factory API definition**
<details>
<summary>Expand for TS Compiler API factory Definition</summary>
  
  ```typescript
  factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier("person"),
        undefined,
        undefined,
        factory.createCallExpression(
          factory.createPropertyAccessExpression(
            factory.createIdentifier("z"),
            factory.createIdentifier("object")
          ),
          undefined,
          [factory.createObjectLiteralExpression(
            [
              factory.createPropertyAssignment(
                factory.createIdentifier("name"),
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("z"),
                    factory.createIdentifier("string")
                  ),
                  undefined,
                  []
                )
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier("age"),
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("z"),
                    factory.createIdentifier("number")
                  ),
                  undefined,
                  []
                )
              )
            ],
            true
          )]
        )
      )],
      ts.NodeFlags.Const
    )
  )
  ```
</details>
<br/>

Some gaps with this approach are:
* It is also not very extensible or script-able
* It can result in boilerplate and repeated code
* It is relatively inaccessible
* It has little to no similarity with the zod library

The `zod` library itself is a powerful and extensible library with a very simple, chainable API, and it would be ideal if we could generate zod validators in a similar fashion.

This project introduces abstractions on top of the TS compiler API  for simplifying the process of generating Typescript expressions for zod validators and addresses the above gaps.

With `zod-factory`, the same zod expression can be generated a number of different ways, described in the [Usage](#usage) section below.


## Usage

The AST node for the zod validator above can be created using this library in 3 different ways:

### `zf` - zod-factory main
This exposes helper methods for generating the corresponding AST nodes that map to a zod schema. 

```typescript
import { printNode } from 'zod-factory'
const schema = zf.object({
  name: zf.string(),
  age: zf.number.t.min(zf.number(), 18),
});

const result = printNode(schema); // result: z.object({ name: z.string(), age: z.number().min(18) })
```

Here, methods that can be accessed directly on the `zod` object can also be accessed directly on the `zf` object to generate their AST node equivalent.

Methods that are accessed indirectly from `z` (e.g `min`, `max`, `email` etc.) are accessibly on a `.t` key, of the name of the direct zod property. This could be subject to change if there is a better experience for this.

### `zfs` - zod-factory 'serialized'
This API builds on top of the core, and accepts more 'serial' arguments:
```typescript
const schema = zfs([
  ['object', {
    name: zfs([['string']]),
    age: zfs([['number'], ['min', 18]]),
  }]
])

const result = printNode(schema); // result: z.object({ name: z.string(), age: z.number().min(18) })
```

The format for the arguments here is a list of lists, where each item in the outer list is of the shape: `[<token>, ...args]`, where `token` corresponds with a zod method and `args` are the arguments to that method.

This API is the most convenient for generating a schema in stages.

**Example:**
```typescript
const params: any = []

params.push(['number'])
params.push(['min', 18])

if (condition) {
  params.push(['optional'])
  params.push(['default', 18])
}

params.push(['describe', 'Age of the person'])

const schema = zfs(params)
const result = printNode(schema); // result: z.number().min(18).describe('Age of the person')
```

### `zfl` - zod-factory 'lazy'
And then finally, an API which has an API closest to zod itself, and executes 'lazily'. Under the hood, all arguments necessary to create the AST are accumulated until a call to `create` is made:
```typescript
const schema = zfl().object({
  name: zfl().string().create(),
  age: zfl().number().min(18).create(),
}).create()

const result = printNode(schema); // result: z.object({ name: z.string(), age: z.number().min(18) })
```

This API is designed to feel more like zod itself.

## Code Generation
In the `playground` directory, I experiment with some code generation tasks, including directly from expressions generated by `zf`, `zfs` and `zfl` above, and then also from an experimental "custom-format". 
I hope to turn these playground scripts into stand-alone scripts that can be applied to outside sources. See more below.

Each of the playground scripts supports the following arguments:
```txt
codegen.ts [flags] [patterns]

Options:
  patterns             patterns to match files and expressions against. e.g "fileA:.*" "fileB:schema$" "fileC:^expression.*"
  
  Flags:
  -d, --directory <dir>  directory to search for files
```

### `codegen.ts`
This script generates Typescript code directly from zod validator  expressions created with `zf`, `zfs` or `zfl`. 

To run `codegen.ts` script, run the following, pointing it to the `sources` directory with the files and expressions:
```bash
$ cd playground
$ ts-node "./codegen/codegen.ts" -d "sources" "with-zf:.*" "with-zfl:.*" "with-zfs:.*"
```

### `codegen-custom.ts`
This generates zod validators from a "custom-format" I came up with for defining validation rules. This format is a POC for code generation from other validation rule definition formats to work on in the future such as OpenAPI schemas, and Google's Protobufs. 

To run `codegen.ts` script, run the following, pointing it to the `sources` directory with the files containing custom-format expressions:
```bash
$ cd playground
$ ts-node "./codegen/codegen-custom.ts" -d "sources" "custom-schema:.*"
```

In this custom-format, I am exploring referencing other schemas that have been predefined in the context of the running script. The reference is replaced with zod validator expression for the referenced schema.

For example:

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

The above is converted to the following code:

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

### `codegen-openapi.ts`
This script generates zod schemas from OpenAPI schema components. Similar to the above, this script
takes the `filename:schemaNameRegex` arguments, and generates zod schemas from the schema AST node definitions in the file that match the regex.

To run `codegen.ts` script, run the following, pointing it to the `sources` directory with the files containing custom-format expressions:

```bash
$ cd playground
$ ts-node "./codegen/codegen-openapi.ts" -d "sources" "openapi-schema:.*" 
```

For OpenApi schemas, references are resolved by replacing them with the name of the referenced schema. For example:

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

The above is converted to the following code:

```typescript
import { z } from "zod";

export const Emoji = z.string().emoji().max(1).describe("An emoji");

export const Person = z.object({
  name: z.string().describe("The name of the person"),
  age: z.number().describe("The age of the person"),
  favoriteEmoji: z.optional(Emoji),
});
```

The script also supports generating `oneOf` (converted to `z.union(...)`), `anyOf` (also converted to `z.union(...)`), and `allOf` (converted to chain of 'and's `schemaA.and(schemaB)`).

## Project Status: Early Stages ⚠️
This library is still in very early stages and is not fully featured yet with the `zod` itself. I hope to continue adding more features and abstractions to the library to make it on par with `zod` and some more utilities.

Some known features yet to be added include:
- [ ] For `codegen-openapi.ts`, support for `'discriminator'`
- [ ] For `zf`, `zfs` and `zfl`, support for `discriminatedUnion` and some enum methods like `extract` and `exclude`


## Acknowledgements
This library was birthed from an independent study course project I am undertaking with my advisor, professor Garret Morris at the University of Iowa.




