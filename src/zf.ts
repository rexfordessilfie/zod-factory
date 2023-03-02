import {
  callExpressionCreatorWithTarget,
  propertyAccessExpressionCreatorWithTarget,
  zodIdentifier,
} from "./utils/ast";
import { zodDirectMembers, zodTokens } from "./utils/constants";
import { arrayMemberCreators } from "./core/array";
import { booleanMemberCreators } from "./core/boolean";
import { coerceMemberCreators } from "./core/coerce";
import { numberMemberCreators } from "./core/number";
import { objectMemberCreators } from "./core/object";
import { stringMemberCreators } from "./core/string";

export const zodDirectMemberCreators = {
  string: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.string),
  number: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.number),
  boolean: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.boolean),
  promise: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.promise),
  object: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.object),
  optional: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.optional),
  array: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.array),
  coerce: propertyAccessExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.coerce
  ),
} as const satisfies Partial<Record<keyof typeof zodDirectMembers, any>>;

export const zodSubMemberCreators = {
  object: objectMemberCreators,
  string: stringMemberCreators,
  number: numberMemberCreators,
  coerce: coerceMemberCreators,
  array: arrayMemberCreators,
  boolean: booleanMemberCreators,
} as const satisfies Partial<Record<keyof typeof zodDirectMembers, any>>;

export const zodFactory = {
  ...zodDirectMemberCreators,
  objectMethods: zodSubMemberCreators.object,
  stringMethods: zodSubMemberCreators.string,
  numberMethods: zodSubMemberCreators.number,
  coerceMethods: zodSubMemberCreators.coerce,
  arrayMethods: zodSubMemberCreators.array,
} as const;

export { zodFactory as zf };
