import { zodSubMemberCreators, zodDirectMemberCreators } from "./zf";

export type LazyTypeMembersByType = {
  [K in keyof typeof zodSubMemberCreators]: keyof (typeof zodSubMemberCreators)[K];
};

export type LazyTypeMembersFlat =
  LazyTypeMembersByType[keyof LazyTypeMembersByType];

export type LazyDirectMemberNames = keyof typeof zodDirectMemberCreators;

export type AllLazyMembers = LazyDirectMemberNames | LazyTypeMembersFlat;

export type LazyParams<T extends AllLazyMembers> = [T, ...any[]][];
