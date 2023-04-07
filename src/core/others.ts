import {
  callExpressionCreatorWithTarget,
  zodIdentifier,
  zodTokens
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

export const createZodUnion = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.union
);
export const _union = Object.assign(createZodUnion, {
  t: buildSharedZodMemberCreators(zodTokens.union)
});

export const createZodEnum = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.enum
);
export const _enum = Object.assign(createZodEnum, {
  t: buildSharedZodMemberCreators(zodTokens.enum)
});

export const createZodLiteral = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.literal
);
export const _literal = Object.assign(createZodLiteral, {
  t: buildSharedZodMemberCreators(zodTokens.literal)
});

export const createZodPromise = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.promise
);
export const _promise = Object.assign(createZodPromise, {
  t: buildSharedZodMemberCreators(zodTokens.promise)
});

export const createZodOptional = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.optional
);
export const _optional = Object.assign(createZodOptional, {
  t: buildSharedZodMemberCreators(zodTokens.optional)
});

export const createZodAny = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.any
);
export const _any = Object.assign(createZodAny, {
  t: buildSharedZodMemberCreators(zodTokens.any)
});

export const createZodUnknown = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.unknown
);
export const _unknown = Object.assign(createZodUnknown, {
  t: buildSharedZodMemberCreators(zodTokens.unknown)
});

export const createZodBigint = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.bigint
);
export const _bigint = Object.assign(createZodBigint, {
  t: buildSharedZodMemberCreators(zodTokens.bigint)
});

export const createZodDate = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.date
);
export const _date = Object.assign(createZodDate, {
  t: buildSharedZodMemberCreators(zodTokens.date)
});

export const createZodFunction = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.function
);
export const _function = Object.assign(createZodFunction, {
  t: buildSharedZodMemberCreators(zodTokens.function)
});

export const createZodNull = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.null
);
export const _null = Object.assign(createZodNull, {
  t: buildSharedZodMemberCreators(zodTokens.null)
});
export const createZodUndefined = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.undefined
);
export const _undefined = Object.assign(createZodUndefined, {
  t: buildSharedZodMemberCreators(zodTokens.undefined)
});
export const createZodNever = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.never
);
export const _never = Object.assign(createZodNever, {
  t: buildSharedZodMemberCreators(zodTokens.never)
});
export const createZodVoid = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.void
);
export const _void = Object.assign(createZodVoid, {
  t: buildSharedZodMemberCreators(zodTokens.void)
});
export const createZodNullable = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.nullable
);
export const _nullable = Object.assign(createZodNullable, {
  t: buildSharedZodMemberCreators(zodTokens.nullable)
});

export const createZodCustom = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.custom
);
export const _custom = Object.assign(createZodCustom, {
  t: buildSharedZodMemberCreators(zodTokens.custom)
});
export const createZodMap = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.map
);
export const _map = Object.assign(createZodMap, {
  t: buildSharedZodMemberCreators(zodTokens.map)
});

export const createZodRecord = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.record
);
export const _record = Object.assign(createZodRecord, {
  t: buildSharedZodMemberCreators(zodTokens.record)
});

export const createZodTuple = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.tuple
);
export const _tuple = Object.assign(createZodTuple, {
  t: buildSharedZodMemberCreators(zodTokens.tuple)
});
export const createZodIntersection = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.intersection
);
export const _intersection = Object.assign(createZodIntersection, {
  t: buildSharedZodMemberCreators(zodTokens.intersection)
});

export const createZodNan = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.nan
);
export const _nan = Object.assign(createZodNan, {
  t: buildSharedZodMemberCreators(zodTokens.nan)
});
export const createZodOboolean = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.oboolean
);
export const _oboolean = Object.assign(createZodOboolean, {
  t: buildSharedZodMemberCreators(zodTokens.oboolean)
});
export const createZodDiscriminatedUnion = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.discriminatedUnion
);
export const _discriminatedUnion = Object.assign(createZodDiscriminatedUnion, {
  t: buildSharedZodMemberCreators(zodTokens.discriminatedUnion)
});

export const createZodInstanceOf = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.instanceof
);
export const _instanceOf = Object.assign(createZodInstanceOf, {
  t: buildSharedZodMemberCreators(zodTokens.instanceof)
});

export const createZodOnumber = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.onumber
);
export const _onumber = Object.assign(createZodOnumber, {
  t: buildSharedZodMemberCreators(zodTokens.onumber)
});
export const createZodOstring = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.ostring
);
export const _ostring = Object.assign(createZodOstring, {
  t: buildSharedZodMemberCreators(zodTokens.ostring)
});
export const createZodNativeEnum = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.nativeEnum
);
export const _nativeEnum = Object.assign(createZodNativeEnum, {
  t: buildSharedZodMemberCreators(zodTokens.nativeEnum)
});

export const createZodLazy = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.lazy
);
export const _lazy = Object.assign(createZodLazy, {
  t: buildSharedZodMemberCreators(zodTokens.lazy)
});
export const createZodTransformer = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.transformer
);
export const _transformer = Object.assign(createZodTransformer, {
  t: buildSharedZodMemberCreators(zodTokens.transformer)
});

export const createZodEffect = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.effect
);
export const _effect = Object.assign(createZodEffect, {
  t: buildSharedZodMemberCreators(zodTokens.effect)
});

export const createZodPipeline = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.pipeline
);
export const _pipeline = Object.assign(createZodPipeline, {
  t: buildSharedZodMemberCreators(zodTokens.pipeline)
});

export const createZodPreprocess = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.preprocess
);
export const _preprocess = Object.assign(createZodPreprocess, {
  t: buildSharedZodMemberCreators(zodTokens.preprocess)
});

export const createZodSymbol = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.symbol
);
export const _symbol = Object.assign(createZodSymbol, {
  t: buildSharedZodMemberCreators(zodTokens.symbol)
});

export const createZodStrictObject = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.strictObject
);
export const _strictObject = Object.assign(createZodStrictObject, {
  t: buildSharedZodMemberCreators(zodTokens.strictObject)
});
