import { zodTokens, zodZ, zodZod } from "../utils";

import ts, { factory } from "typescript";
import { convertToExpression } from "./converters";

export const createZodImport = () => {
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
        ),
      ])
    ),
    factory.createStringLiteral(zodZod),
    undefined
  );
};

export const createZodIdentifier = () => {
  return extendExpressionWithFactoryType(factory.createIdentifier(zodZ), zodZ);
};

export const extendExpressionWithFactoryType = <E extends ts.Expression, T>(
  target: E,
  type: T
) => {
  return Object.assign(target, {
    _zfType: type,
  });
};

export const zodIdentifier = createZodIdentifier();

export const createSchemaExport = (name: string, value: ts.Expression) => {
  return factory.createVariableStatement(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(name),
          undefined,
          undefined,
          value
        ),
      ],
      ts.NodeFlags.Const
    )
  );
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

export const extendExpressionWithArgs = <
  E extends ts.Expression,
  Args extends any[] = any[]
>(
  target: E,
  args: Args
) => {
  return Object.assign(target, {
    _zfArgs: args,
  });
};

export type ValueOf<T extends Record<string, any>> = T[keyof T];

export const callExpressionCreatorWithTarget =
  <T1 extends ValueOf<typeof zodTokens>, E extends ts.Expression>(
    target: E,
    name: T1
  ) =>
  <Args extends any[] = any[]>(...args: Args) => {
    const expression = createPropertyAccessCall(target, name, args);
    return extendExpressionWithArgs(
      extendExpressionWithFactoryType(expression, name),
      args
    );
  };

export const propertyAccessExpressionCreatorWithTarget =
  <T1 extends ValueOf<typeof zodTokens>, E extends ts.Expression>(
    target: E,
    name: T1
  ) =>
  <Args extends any[] = any[]>(...args: Args) => {
    const expression = createPropertyAccess(target, name);
    return extendExpressionWithArgs(
      extendExpressionWithFactoryType(expression, name),
      args
    );
  };

export const callExpressionCreator =
  <T1 extends ValueOf<typeof zodTokens>>(name: T1) =>
  <Args extends any[] = any[]>(target: ts.Expression, ...args: Args) => {
    const expression = createPropertyAccessCall(target, name, args);
    return extendExpressionWithArgs(
      extendExpressionWithFactoryType(expression, name),
      args
    );
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
