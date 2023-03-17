import { zfs } from "..";
import { printNode } from "..";

describe("zfs", () => {
  test("should throw when given invalid direct member", () => {
    expect(() => zfs([["methodThatDoesNotExist" as any]])).toThrowError(
      /unrecognized initial member/i
    );
  });

  test("should throw when given invalid sub member", () => {
    expect(() =>
      zfs([["string"], ["stringMethodThatDoesNotExist" as any]])
    ).toThrowError(
      /unrecognized member 'stringMethodThatDoesNotExist' on 'string'/i
    );
  });
});
