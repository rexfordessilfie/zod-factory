import { zodTokens, zodZ, zodZod } from ".";

import ts, { factory } from "typescript";

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

export const zodIdentifier = () => {
  return extendExpressionWithFactoryType(factory.createIdentifier(zodZ), zodZ);
};

const extendExpressionWithFactoryType = <E extends ts.Expression, T>(
  target: E,
  type: T
) => {
  return Object.assign(target, {
    _zfType: type
  });
};

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

export const convertToExpression = (arg: any): ts.Expression => {
  // TODO: expand to cover more type of expressions?

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

export const createPropertyAccess = (
  target: ts.Expression,
  propertyName: string
) => {
  return factory.createPropertyAccessExpression(target, propertyName);
};

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

export type ValueOf<T extends Record<string, any>> = T[keyof T];

export const callExpressionCreatorWithTarget =
  <T1 extends ValueOf<typeof zodTokens>, E extends ts.Expression>(
    target: E,
    name: T1
  ) =>
  <Args extends any[] = any[]>(...args: Args) => {
    const expression = createPropertyAccessCall(target, name, args);
    return extendExpressionWithFactoryType(expression, name);
  };

export const propertyAccessExpressionCreatorWithTarget =
  <T1 extends ValueOf<typeof zodTokens>, E extends ts.Expression>(
    target: E,
    name: T1
  ) =>
  <Args extends any[] = any[]>(...args: Args) => {
    const expression = createPropertyAccess(target, name);
    return extendExpressionWithFactoryType(expression, name);
  };

export const callExpressionCreator =
  <T1 extends ValueOf<typeof zodTokens>>(name: T1) =>
  <Args extends any[] = any[]>(target: ts.Expression, ...args: Args) => {
    const expression = createPropertyAccessCall(target, name, args);
    return extendExpressionWithFactoryType(expression, name);
  };

export const callExpressionCreatorWithFactoryType =
  <
    T1 extends ValueOf<typeof zodTokens>,
    T2 extends ValueOf<typeof zodTokens>,
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

export const callExpressionCreatorWithPreviousType =
  <
    T1 extends ValueOf<typeof zodTokens>,
    E extends ts.Expression & { _zfType: ValueOf<typeof zodTokens> }
  >(
    name: T1
  ) =>
  <Args extends any[] = any[]>(target: E, ...args: Args) => {
    if (!target) throw new Error("Missing target expression!");
    const expression = createPropertyAccessCall(target, name, args);
    return extendExpressionWithFactoryType(expression, target._zfType);
  };
