import { zf } from "./zf";

// Source: https://time-is-life.fun/typescript-extracting-keys-of-union-type-keyof-uniontype/
export type KeysOfUnion<T> = T extends T ? keyof T : never;

export type LazyTypeMembersFlat = KeysOfUnion<
  (typeof zf)[keyof typeof zf]["t"]
>;

export type LazyDirectMemberNames = keyof typeof zf;

export type AllLazyMembers = LazyDirectMemberNames | LazyTypeMembersFlat;

export type LazyParams<T extends AllLazyMembers> = [T, ...any[]][];
