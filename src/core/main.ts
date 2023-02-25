import {
  callExpressionCreator,
  callExpressionCreatorWithFactoryType,
  callExpressionCreatorWithPreviousType,
  callExpressionCreatorWithTarget,
  propertyAccessExpressionCreatorWithTarget,
  ValueOf,
  zodIdentifier,
} from "../utils/helpers";

import {
  zodArrayMembers,
  zodBooleanMembers,
  zodCoerceMembers,
  zodDirectTypeMembers,
  zodNumberMembers,
  zodObjectMembers,
  zodStringMembers,
  zodTokens,
  zodTypeMembers,
} from "../utils/constants";

function createCommonZodTypeMemberCreators<T extends ValueOf<typeof zodTokens>>(
  type: T
) {
  return {
    // Type changing methods
    promise: callExpressionCreator(zodTokens.promise),
    and: callExpressionCreator(zodTokens.and),
    or: callExpressionCreator(zodTokens.or),
    array: callExpressionCreator(zodTokens.array),

    // Type preserving methods
    describe: callExpressionCreatorWithFactoryType(zodTokens.describe, type),
    nullable: callExpressionCreatorWithFactoryType(zodTokens.nullable, type),
    optional: callExpressionCreatorWithFactoryType(zodTokens.optional, type),
    nullish: callExpressionCreatorWithFactoryType(zodTokens.nullish, type),
    catch: callExpressionCreatorWithFactoryType(zodTokens.nullish, type),
  } as const satisfies Partial<Record<keyof typeof zodTypeMembers, any>>;
}

export const zodDirectTypeMemberCreators = {
  string: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.string),
  number: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.number),
  boolean: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.boolean),
  promise: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.promise),
  object: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.object),
  optional: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.optional),
  coerce: propertyAccessExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.coerce
  ),
} as const satisfies Partial<Record<keyof typeof zodDirectTypeMembers, any>>;

export const zodStringMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.string),
  max: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.string),
  ...createCommonZodTypeMemberCreators(zodTokens.string),
} as const satisfies Partial<Record<keyof typeof zodStringMembers, any>>;

export const zodNumberMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.number),
  max: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.number),
  ...createCommonZodTypeMemberCreators(zodTokens.number),
} as const satisfies Partial<Record<keyof typeof zodNumberMembers, any>>;

export const zodCoerceMemberCreators = {
  string: callExpressionCreator(zodTokens.string),
  number: callExpressionCreator(zodTokens.number),
  boolean: callExpressionCreator(zodTokens.boolean),
  date: callExpressionCreator(zodTokens.date),
  bigint: callExpressionCreator(zodTokens.bigint),
} as const satisfies Partial<Record<keyof typeof zodCoerceMembers, any>>;

export const zodArrayMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.array),
  max: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.array),
  length: callExpressionCreatorWithFactoryType(
    zodTokens.length,
    zodTokens.array
  ),
  element: callExpressionCreatorWithPreviousType(zodTokens.element),
  nonempty: callExpressionCreatorWithFactoryType(
    zodTokens.nonempty,
    zodTokens.array
  ),
  ...createCommonZodTypeMemberCreators(zodTokens.array),
} as const satisfies Partial<Record<keyof typeof zodArrayMembers, any>>;

export const zodBooleanMemberCreators = {
  ...createCommonZodTypeMemberCreators(zodTokens.boolean),
} as const satisfies Partial<Record<keyof typeof zodBooleanMembers, any>>;

export const zodObjectMemberCreators = {
  partial: callExpressionCreatorWithFactoryType(
    zodTokens.partial,
    zodTokens.object
  ),
  strict: callExpressionCreatorWithFactoryType(
    zodTokens.strict,
    zodTokens.object
  ),
  deepPartial: callExpressionCreatorWithFactoryType(
    zodTokens.deepPartial,
    zodTokens.object
  ),
  nonstrict: callExpressionCreatorWithFactoryType(
    zodTokens.nonstrict,
    zodTokens.object
  ),
  ...createCommonZodTypeMemberCreators(zodTokens.object),
} as const satisfies Partial<Record<keyof typeof zodObjectMembers, any>>;

export const zodDirectMemberCreators = {
  object: zodObjectMemberCreators,
  string: zodStringMemberCreators,
  number: zodNumberMemberCreators,
  coerce: zodCoerceMemberCreators,
  array: zodArrayMemberCreators,
  boolean: zodBooleanMemberCreators,
} as const satisfies Partial<Record<keyof typeof zodDirectTypeMembers, any>>;

export const zf = {
  ...zodDirectTypeMemberCreators,
  objectMethods: zodDirectMemberCreators.object,
  stringMethods: zodDirectMemberCreators.string,
  numberMethods: zodDirectMemberCreators.number,
  coerceMethods: zodDirectMemberCreators.coerce,
  arrayMethods: zodDirectMemberCreators.array,
} as const;
