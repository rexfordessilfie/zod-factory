import ts from "typescript";
import {
  zf,
  zodDirectTypeMemberCreators,
  zodDirectMemberCreators,
} from "./main";
import { OnlyMethods, zodTokens } from "../utils";

type LazyTypeMembersByType = {
  [K in keyof typeof zodDirectMemberCreators]: keyof (typeof zodDirectMemberCreators)[K];
};

type LazyTypeMembersFlat = LazyTypeMembersByType[keyof LazyTypeMembersByType];

type LazyDirectMemberNames = keyof typeof zodDirectTypeMemberCreators;

type AllLazyMembers = LazyDirectMemberNames | LazyTypeMembersFlat;

type LazyParams<T extends AllLazyMembers> = [T, ...any[]][];

export function zfs<T extends AllLazyMembers>(params: LazyParams<T>) {
  const [first, ...rest] = params || [];
  const [_initialMember, ...initialMemberArgs] = first || [];

  let initialMember = _initialMember as keyof OnlyMethods<typeof zf>;

  const initialExpression = zf[initialMember](...initialMemberArgs);

  return rest.reduce((acc, curr) => {
    const [currMethod, ...currArgs] = curr;

    const typeMethodKey = `${acc._zfType}` as const;
    if (typeMethodKey in zf) {
      const typeMethods = zodDirectMemberCreators[typeMethodKey];
      if (typeMethods) {
        if (currMethod in typeMethods) {
          const creator = typeMethods[currMethod as keyof typeof typeMethods];
          //@ts-ignore
          const result = creator(acc, ...currArgs);
          return result;
        }
      }
    }

    return acc;
  }, initialExpression as ts.Expression & { _zfType: keyof typeof zodDirectMemberCreators });
}

function createLazyMember<T extends AllLazyMembers>(token: T, soFar: any[]) {
  const zodTokenKeys = Object.keys(zodTokens) as AllLazyMembers[];

  return (...args: any[]) => {
    soFar.push([token, ...args]);

    return zodTokenKeys.reduce(
      (acc, curr) => {
        return {
          ...acc,
          [curr]: createLazyMember(curr, soFar),
        };
      },
      { create: () => zfs(soFar) } as LazyResult
    );
  };
}

// TODO: we can make the types stronger here
type LazyResult<T extends string = string> = {
  create: () => ReturnType<typeof zfs>;
} & Record<AllLazyMembers, (...args: any[]) => LazyResult>;

export function zfl() {
  const params: any[] = [];

  const zodDirectKeys = Object.keys(
    zodDirectTypeMemberCreators
  ) as (keyof typeof zodDirectTypeMemberCreators)[];
  return zodDirectKeys.reduce((acc, name) => {
    return {
      ...acc,
      [name]: createLazyMember(name, params),
    };
  }, {} as Record<(typeof zodDirectKeys)[number], ReturnType<typeof createLazyMember>>);
}
