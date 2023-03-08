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
    throw new Error(`Unrecognized initial member: ${initialMember}`);
  }

  const initialExpression = creator(...initialMemberArgs);

  return rest.reduce((acc, curr) => {
    const [currMethod, ...currArgs] = curr;

    const typeMethodKey = `${acc._zfType}` as const;

    if (!(typeMethodKey in zf)) {
      throw new Error(`Unrecognized _zfType for expression: ${acc._zfType}`);
    }

    const typeMethods = zodSubMemberCreators[typeMethodKey];

    if (!(currMethod in typeMethods)) {
      throw new Error(`Unrecognized sub member: ${currMethod}`);
    }

    const creator = typeMethods[currMethod as keyof typeof typeMethods];

    //@ts-ignore
    const result = creator(acc, ...currArgs);
    return result;

    return acc;
  }, initialExpression as ts.Expression & { _zfType: keyof typeof zodSubMemberCreators });
}

export { zodFactorySerial as zfs };
