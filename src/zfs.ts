import ts from "typescript";
import { zodSharedMemberCreators } from "./core/shared";
import { AllLazyMembers, LazyParams } from "./types";
import { OnlyMethods } from "./utils";
import { zf, zodSubMemberCreators } from "./zf";

export function zodFactorySerial<T extends AllLazyMembers>(
  params: LazyParams<T>
) {
  const [first, ...rest] = params || [];
  const [_initialMember, ...initialMemberArgs] = first || [];

  let initialMember = _initialMember as keyof OnlyMethods<typeof zf>;
  const creator = zf[initialMember];

  if (typeof creator !== "function") {
    throw new Error(`Unrecognized initial member: ${initialMember}`);
  }

  const initialExpression = creator(...initialMemberArgs);

  return rest.reduce((acc, curr) => {
    const [currMethod, ...currArgs] = curr;

    const typeMethodKey = `${acc._zfType}` as const;

    // If we don't have sub methods defined for this, fall back to the shared methods
    if (!(typeMethodKey in zf)) {
      const creator =
        zodSharedMemberCreators[currMethod as keyof typeof typeMethods];

      if (!creator) {
        throw new Error(`Unrecognized shared member: ${currMethod}`);
      }

      //@ts-ignore
      const result = creator(acc, ...currArgs);
      return result;
    }

    const typeMethods = zodSubMemberCreators[typeMethodKey];

    if (!typeMethods) {
      throw new Error(
        `Missing sub methods for _zfType: ${acc._zfType} on member: ${currMethod}}`
      );
    }

    if (!(currMethod in typeMethods)) {
      throw new Error(`Unrecognized sub member: ${currMethod}`);
    }

    const creator = typeMethods[currMethod as keyof typeof typeMethods];

    if (!creator) {
      throw new Error(`Unrecognized sub member: ${currMethod}`);
    }

    //@ts-ignore
    const result = creator(acc, ...currArgs);
    return result;
  }, initialExpression as ts.Expression & { _zfType: keyof typeof zodSubMemberCreators });
}

export { zodFactorySerial as zfs };
