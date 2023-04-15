import ts from "typescript";
import { zodTokens } from "./utils";
import { ZfMembers, LazyParams, LazyResult } from "./types";
import { of } from "./core/shared";
import * as core from "./core/external";

export function zfs<T extends ZfMembers>(params: LazyParams<T>) {
  const [first, ...rest] = params || [];
  const [_initialMember, ...initialMemberArgs] = first || [];

  let initialMember = _initialMember as keyof typeof core;
  const creator = core[initialMember];

  if (typeof creator !== "function") {
    throw new Error(`Unrecognized initial member: ${initialMember}`);
  }

  const initialExpression = creator(...initialMemberArgs);

  return rest.reduce((acc, curr) => {
    const [currMethod, ...currArgs] = curr;

    const typeMethodKey = `${acc._zfType}` as const;

    // If we don't have sub methods defined for this, fall back to the shared methods
    const methods = core[typeMethodKey]?.of || of;

    const creator = methods[currMethod as keyof typeof methods];

    if (!creator) {
      throw new Error(
        `Unrecognized member '${String(currMethod)}' on '${acc._zfType}'`
      );
    }

    //@ts-ignore
    return creator(acc, ...(currArgs || []));
  }, initialExpression as ts.Expression & { _zfType: keyof typeof core });
}

function addMember<T extends ZfMembers>(token: T, soFar: any[]) {
  const zodTokenKeys = Object.keys(zodTokens) as ZfMembers[];

  return (...args: any[]) => {
    soFar.push([token, ...args]);

    return zodTokenKeys.reduce(
      (acc, curr) => {
        return {
          ...acc,
          [curr]: addMember(curr, soFar)
        };
      },
      { create: () => zfs(soFar) } as LazyResult
    );
  };
}

export function zfl() {
  const params: any[] = [];

  const zodDirectKeys = Object.keys(core) as (keyof typeof core)[];
  return zodDirectKeys.reduce((acc, name) => {
    return {
      ...acc,
      [name]: addMember(name, params)
    };
  }, {} as Record<keyof typeof core, ReturnType<typeof addMember>>);
}
