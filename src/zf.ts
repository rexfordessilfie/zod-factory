import {
  callExpressionCreatorWithPreviousType,
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
import { setMemberCreators } from "./core/set";
import { buildSharedZodMemberCreators } from "./core/shared";

export const zodDirectMemberCreators = {
  union: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.union),
  enum: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.enum),
  literal: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.literal),
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
  any: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.any),
  unknown: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.unknown),
  bigint: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.bigint),
  date: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.date),
  function: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.function),
  null: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.null),
  undefined: callExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.undefined
  ),
  never: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.never),
  void: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.void),
  nullable: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.nullable),
  custom: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.custom),
  map: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.map),
  set: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.set),
  record: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.record),
  tuple: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.tuple),
  intersection: callExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.intersection
  ),
  nan: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.nan),
  oboolean: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.oboolean),
  discriminatedUnion: callExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.discriminatedUnion
  ),
  instanceof: callExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.instanceof
  ),
  onumber: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.onumber),
  ostring: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.ostring),
  nativeEnum: callExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.nativeEnum
  ),
  lazy: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.lazy),
  transformer: callExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.transformer
  ),

  effect: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.effect),
  pipeline: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.pipeline),
  preprocess: callExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.preprocess
  ),
  symbol: callExpressionCreatorWithTarget(zodIdentifier, zodTokens.symbol),
  strictObject: callExpressionCreatorWithTarget(
    zodIdentifier,
    zodTokens.strictObject
  ),
} as const satisfies Partial<Record<keyof typeof zodDirectMembers, any>>;

export const zodSubMemberCreators = {
  object: objectMemberCreators,
  string: stringMemberCreators,
  number: numberMemberCreators,
  coerce: coerceMemberCreators,
  array: arrayMemberCreators,
  set: setMemberCreators,
  boolean: booleanMemberCreators,
} as const satisfies Partial<Record<keyof typeof zodDirectMembers, any>>;

export const zodFactory = {
  ...zodDirectMemberCreators,
  objectMethods: zodSubMemberCreators.object,
  stringMethods: zodSubMemberCreators.string,
  numberMethods: zodSubMemberCreators.number,
  coerceMethods: zodSubMemberCreators.coerce,
  arrayMethods: zodSubMemberCreators.array,
  setMethods: zodSubMemberCreators.set,
} as const;

export { zodFactory as zf };
