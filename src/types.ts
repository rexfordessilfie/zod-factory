import * as core from "./core/external";

// Source: https://time-is-life.fun/typescript-extracting-keys-of-union-type-keyof-uniontype/
export type KeysOfUnion<T> = T extends T ? keyof T : never;

export type LazyTypeMembersFlat = KeysOfUnion<
  (typeof core)[keyof typeof core]["t"]
>;

export type LazyDirectMemberNames = keyof typeof core;

export type AllLazyMembers = LazyDirectMemberNames | LazyTypeMembersFlat;

export type LazyParams<T extends AllLazyMembers> = [T, ...any[]][];
