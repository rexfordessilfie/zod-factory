import * as core from "./core/external";
import ts from "typescript";

// Source: https://time-is-life.fun/typescript-extracting-keys-of-union-type-keyof-uniontype/
export type KeysOfUnion<T> = T extends T ? keyof T : never;

export type FlatTypeMembers = KeysOfUnion<
  (typeof core)[keyof typeof core]["of"]
>;

export type DirectMembers = keyof typeof core;

export type ZfMembers = DirectMembers | FlatTypeMembers;

export type LazyParams<T extends ZfMembers> = [T, ...any[]][];

// TODO: we can make the types stronger here
export type LazyResult<
  T extends string = string,
  E extends ts.Expression & { _zfType: string } = ts.Expression & {
    _zfType: string;
  }
> = {
  create: () => E;
} & Record<ZfMembers, (...args: any[]) => LazyResult>;
