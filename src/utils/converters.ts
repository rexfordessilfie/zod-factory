import ts, { factory } from "typescript";

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

  if (ts.isIdentifier(arg)) {
    return arg;
  }

  if (ts.isCallExpression(arg)) {
    return arg;
  }

  if (Array.isArray(arg)) {
    return factory.createArrayLiteralExpression(
      arg.map((item) => convertToExpression(item))
    );
  }

  switch (typeof arg) {
    case "undefined":
      return factory.createIdentifier("undefined");
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
    default:
      throw new Error(`Unsupported type: ${typeof arg}`);
  }
};
