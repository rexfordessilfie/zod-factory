import { zodZ, zodZod } from ".";

import ts, { factory } from "typescript";
import { ZodToken } from "./types";

/** Creates a `import { z } from "zod"` import declaration AST node. */
export const zodImport = () => {
  return factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(
          false,
          undefined,
          factory.createIdentifier(zodZ)
        )
      ])
    ),
    factory.createStringLiteral(zodZod),
    undefined
  );
};

/** Creates a `z` identifier expression tagged with `_zfType: "z"`. */
export const zodIdentifier = () => {
  return extendExpressionWithFactoryType(factory.createIdentifier(zodZ), zodZ);
};

/** Attaches a `_zfType` tag to a TS expression for tracking the Zod schema type. */
const extendExpressionWithFactoryType = <E extends ts.Expression, T>(
  target: E,
  type: T
) => {
  return Object.assign(target, {
    _zfType: type
  });
};

/** Creates an `export const <name> = <value>` variable statement AST node. */
export const schemaExport = (name: string, value: ts.Expression) => {
  return factory.createVariableStatement(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(name),
          undefined,
          undefined,
          value
        )
      ],
      ts.NodeFlags.Const
    )
  );
};

/** Converts a plain JS object into a TS object literal expression, recursively converting values. */
export const convertObjectToExpression = (obj: any) => {
  const propertyAssignments = Object.keys(obj).map((key) => {
    const valueExpression = convertToExpression(obj[key]);

    return factory.createPropertyAssignment(
      factory.createIdentifier(key),
      valueExpression
    );
  });
  return factory.createObjectLiteralExpression(propertyAssignments, false);
};

/**
 * Converts a JS value into the corresponding TS AST expression node.
 * Handles primitives (string, number, boolean, bigint, symbol), arrays,
 * plain objects, null, undefined, and passes through existing TS AST nodes.
 */
export const convertToExpression = (arg: any): ts.Expression => {

  if (arg === null) {
    return factory.createNull();
  }

  if (typeof arg === "undefined") {
    return factory.createIdentifier("undefined");
  }

  if (ts.isIdentifier(arg)) {
    return arg;
  }

  if (ts.isCallExpression(arg)) {
    return arg;
  }

  if (ts.isPropertyAccessExpression(arg)) {
    return arg;
  }

  if (Array.isArray(arg)) {
    return factory.createArrayLiteralExpression(
      arg.map((item) => convertToExpression(item))
    );
  }

  switch (typeof arg) {
    case "symbol":
      return factory.createIdentifier(arg.toString());
    case "bigint":
      return factory.createBigIntLiteral(arg.toString());
    case "string":
      return factory.createStringLiteral(arg);
    case "number":
      return factory.createNumericLiteral(arg);
    case "boolean":
      return arg ? factory.createTrue() : factory.createFalse();
    case "object":
      return convertObjectToExpression(arg);
    case "function":
      return factory.createIdentifier(arg.toString());
    default:
      throw new Error(`Unsupported type: ${typeof arg}`);
  }
};

/** Creates a property access expression: `target.propertyName`. */
export const createPropertyAccess = (
  target: ts.Expression,
  propertyName: string
) => {
  return factory.createPropertyAccessExpression(target, propertyName);
};

/** Creates a method call expression: `target.propertyName(args)`. */
export const createPropertyAccessCall = (
  target: ts.Expression,
  propertyName: string,
  args?: any[]
) => {
  const callExpressionArgs = args?.map((arg) => convertToExpression(arg));
  return factory.createCallExpression(
    createPropertyAccess(target, propertyName),
    undefined,
    callExpressionArgs || []
  );
};

/**
 * Creates a factory function that produces `target.name(...args)` call expressions.
 * The returned expression is tagged with `_zfType` set to `name`.
 * Used to create top-level Zod constructors like `z.string()`, `z.number()`.
 */
export const callExpressionCreatorWithTarget =
  <T1 extends ZodToken, E extends ts.Expression>(target: E, name: T1) =>
  <Args extends any[] = any[]>(...args: Args) => {
    const expression = createPropertyAccessCall(target, name, args);
    return extendExpressionWithFactoryType(expression, name);
  };

/**
 * Creates a factory function that produces `target.name` property access expressions.
 * Similar to {@link callExpressionCreatorWithTarget} but without the call parentheses.
 */
export const propertyAccessExpressionCreatorWithTarget =
  <T1 extends ZodToken, E extends ts.Expression>(target: E, name: T1) =>
  <Args extends any[] = any[]>(...args: Args) => {
    const expression = createPropertyAccess(target, name);
    return extendExpressionWithFactoryType(expression, name);
  };

/**
 * Creates a member method that chains onto a target expression: `target.name(...args)`.
 * The returned expression's `_zfType` is set to `name` (the method name), meaning
 * the type changes after the call. Used for type-changing shared methods like
 * `.transform()`, `.pipe()`, `.array()`.
 */
export const callExpressionCreator =
  <T1 extends ZodToken>(name: T1) =>
  <Args extends any[] = any[]>(target: ts.Expression, ...args: Args) => {
    const expression = createPropertyAccessCall(target, name, args);
    return extendExpressionWithFactoryType(expression, name);
  };

/**
 * Creates a member method that chains onto a target expression: `target.name(...args)`.
 * The returned expression's `_zfType` is set to the provided `type` parameter,
 * preserving a specific type identity. Used for type-preserving methods like
 * `string.email()`, `number.int()` where the result is still a string/number schema.
 */
export const callExpressionCreatorWithFactoryType =
  <
    T1 extends ZodToken,
    T2 extends ZodToken,
    E extends ts.Expression & { _zfType: T2 }
  >(
    name: T1,
    type: T2
  ) =>
  <Args extends any[] = any[]>(target: E, ...args: Args) => {
    if (!target) throw new Error("Missing target expression!");
    const expression = createPropertyAccessCall(target, name, args);
    return extendExpressionWithFactoryType(expression, type);
  };

/**
 * Creates a member method that chains onto a target expression: `target.name(...args)`.
 * The returned expression inherits the `_zfType` from the target, preserving whatever
 * type the target already had. Used for methods like `array.element()`.
 */
export const callExpressionCreatorWithPreviousType =
  <T1 extends ZodToken, E extends ts.Expression & { _zfType: ZodToken }>(
    name: T1
  ) =>
  <Args extends any[] = any[]>(target: E, ...args: Args) => {
    if (!target) throw new Error("Missing target expression!");
    const expression = createPropertyAccessCall(target, name, args);
    return extendExpressionWithFactoryType(expression, target._zfType);
  };

/** A map of member method names to their creator functions. */
export type MemberCreators = Record<string, (target: any, ...args: any[]) => any>;

/**
 * Attaches bound member methods directly onto a TS expression, enabling the fluent API.
 * Each method, when called, invokes its creator with the expression as the target and
 * recursively enriches the result, allowing chaining: `zf.string().email().min(5)`.
 *
 * @param expression - The AST expression to enrich with chainable methods.
 * @param memberCreators - The member creators to bind (both type-specific and shared).
 * @returns The same expression, mutated with method properties attached.
 */
export function enrichExpression<E extends ts.Expression & { _zfType: any }>(
  expression: E,
  memberCreators: MemberCreators
): E {
  for (const [key, creator] of Object.entries(memberCreators)) {
    (expression as any)[key] = (...args: any[]) => {
      const result = creator(expression, ...args);
      return enrichExpression(result, memberCreators);
    };
  }
  return expression;
}

/**
 * Wraps a factory function so its return value is automatically enriched with
 * chainable member methods via {@link enrichExpression}.
 *
 * @example
 * ```ts
 * const enrichedString = createEnrichedFactory(createZodString, allStringMembers);
 * // Now enrichedString().email().min(5) produces the AST for z.string().email().min(5)
 * ```
 *
 * @param factoryFn - The original factory function (e.g. one created by callExpressionCreatorWithTarget).
 * @param memberCreators - The member creators to attach to every expression the factory produces.
 * @returns A new factory function with the same signature whose results support fluent chaining.
 */
export function createEnrichedFactory<
  T extends (...args: any[]) => ts.Expression & { _zfType: any }
>(factoryFn: T, memberCreators: MemberCreators) {
  return ((...args: any[]) => {
    const expression = factoryFn(...args);
    return enrichExpression(expression, memberCreators);
  }) as T;
}
