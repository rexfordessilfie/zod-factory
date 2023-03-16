import ts from "typescript";
import { convertToExpression, printNode, zfs } from "..";

describe("convertToExpression", () => {
  test("should maintain undefined expressions", () => {
    const undefinedExpression = convertToExpression(undefined);
    expect(printNode(undefinedExpression)).toBe("undefined");
  });

  test("should maintain string literal expressions", () => {
    const stringLiteralExpression = convertToExpression("foo");
    expect(printNode(stringLiteralExpression)).toBe('"foo"');
  });

  test("should maintain number literal expressions", () => {
    const numberLIteralExpression = convertToExpression(5);
    expect(printNode(numberLIteralExpression)).toBe("5");
  });

  test("should maintain null literal expressions", () => {
    const nullLiteralExpression = convertToExpression(null);
    expect(printNode(nullLiteralExpression)).toBe("null");
  });

  test("should maintain array literal expressions", () => {
    const arrayLiteralExpression = convertToExpression([
      1,
      "2",
      null,
      undefined,
    ]);
    expect(printNode(arrayLiteralExpression)).toBe('[1, "2", null, undefined]');
  });

  test("should maintain object literal expressions", () => {
    const objectLiteralExpression = convertToExpression({
      foo: 1,
      bar: "2",
      baz: null,
      qux: undefined,
    });

    expect(printNode(objectLiteralExpression)).toBe(
      '{ foo: 1, bar: "2", baz: null, qux: undefined }'
    );
  });

  test("should maintain boolean literal expressions", () => {
    const trueLiteralExpression = convertToExpression(true);
    expect(printNode(trueLiteralExpression)).toBe("true");

    const falseLiteralExpression = convertToExpression(false);
    expect(printNode(falseLiteralExpression)).toBe("false");
  });

  test("should maintain bigint literal expressions", () => {
    const bigintLiteralExpression = convertToExpression(123n);
    expect(printNode(bigintLiteralExpression)).toBe("123");
  });

  test("should maintain symbol literal expressions", () => {
    const symbolLiteralExpression = convertToExpression(Symbol("foo"));
    expect(printNode(symbolLiteralExpression)).toBe("Symbol(foo)");
  });

  test("should maintain function literal expressions", () => {
    const func = () => null;
    const expected = `() => null`;
    const functionLiteralExpression = convertToExpression(func);
    expect(printNode(functionLiteralExpression)).toBe(expected);
  });

  test("should maintain identifier expressions", () => {
    const identifierExpression = convertToExpression(
      ts.factory.createIdentifier("foo")
    );
    expect(printNode(identifierExpression)).toBe("foo");
  });

  test("should maintain call expressions", () => {
    const callExpression = convertToExpression(
      ts.factory.createCallExpression(
        ts.factory.createIdentifier("foo"),
        undefined,
        [ts.factory.createStringLiteral("bar")]
      )
    );
    expect(printNode(callExpression)).toBe('foo("bar")');
  });

  test("should maintain property access expressions", () => {
    const propertyAccessExpression = convertToExpression(
      ts.factory.createPropertyAccessExpression(
        ts.factory.createIdentifier("foo"),
        ts.factory.createIdentifier("bar")
      )
    );
    expect(printNode(propertyAccessExpression)).toBe("foo.bar");
  });

  test("should work for nested objects", () => {
    const nestedObjectLiteralExpression = convertToExpression({
      foo: 1,
      bar: {
        baz: 2,
        qux: {
          quux: 3,
        },
      },
    });

    expect(printNode(nestedObjectLiteralExpression)).toBe(
      "{ foo: 1, bar: { baz: 2, qux: { quux: 3 } } }"
    );
  });
});
