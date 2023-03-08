import ts from "typescript";
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
    throw new Error(`Invalid initial member: ${initialMember}`);
  }

  const initialExpression = creator(...initialMemberArgs);

  return rest.reduce((acc, curr) => {
    const [currMethod, ...currArgs] = curr;

    const typeMethodKey = `${acc._zfType}` as const;
    if (typeMethodKey in zf) {
      const typeMethods = zodSubMemberCreators[typeMethodKey];
      if (typeMethods) {
        if (currMethod in typeMethods) {
          const creator = typeMethods[currMethod as keyof typeof typeMethods];

          if (typeof creator !== "function") {
            throw new Error(`Invalid member: ${currMethod}`);
          }

          //@ts-ignore
          const result = creator(acc, ...currArgs);
          return result;
        }
      }
    }

    return acc;
  }, initialExpression as ts.Expression & { _zfType: keyof typeof zodSubMemberCreators });
}

export { zodFactorySerial as zfs };
