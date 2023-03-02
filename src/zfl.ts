import { zodDirectMemberCreators } from "./zf";
import { zodTokens } from "./utils";
import { zfs } from "./zfs";
import { AllLazyMembers } from "./types";

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

export function zodFactoryLazy() {
  const params: any[] = [];

  const zodDirectKeys = Object.keys(
    zodDirectMemberCreators
  ) as (keyof typeof zodDirectMemberCreators)[];
  return zodDirectKeys.reduce((acc, name) => {
    return {
      ...acc,
      [name]: createLazyMember(name, params),
    };
  }, {} as Record<(typeof zodDirectKeys)[number], ReturnType<typeof createLazyMember>>);
}

export { zodFactoryLazy as zfl };
