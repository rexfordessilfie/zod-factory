import ts from "typescript";
import { sharedMembers } from "./core/shared";
import { AllLazyMembers, LazyParams } from "./types";
import { OnlyMethods } from "./utils";
import * as core from "./core/external";

export function zfs<T extends AllLazyMembers>(params: LazyParams<T>) {
  const [first, ...rest] = params || [];
  const [_initialMember, ...initialMemberArgs] = first || [];

  let initialMember = _initialMember as keyof OnlyMethods<typeof core>;
  const creator = core[initialMember];

  if (typeof creator !== "function") {
    throw new Error(`Unrecognized initial member: ${initialMember}`);
  }

  const initialExpression = creator(...initialMemberArgs);

  return rest.reduce((acc, curr) => {
    const [currMethod, ...currArgs] = curr;

    const typeMethodKey = `${acc._zfType}` as const;

    let methods: any;

    // If we don't have sub methods defined for this, fall back to the shared methods
    methods = core[typeMethodKey]?.t || sharedMembers;

    const creator = methods[currMethod as keyof typeof methods];

    if (!creator) {
      throw new Error(
        `Unrecognized member '${String(currMethod)}' on '${acc._zfType}'`
      );
    }

    //@ts-ignore
    const result = creator(acc, ...(currArgs || []));
    return result;
  }, initialExpression as ts.Expression & { _zfType: keyof typeof core });
}
