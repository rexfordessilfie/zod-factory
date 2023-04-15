import {
  callExpressionCreatorWithTarget,
  zodIdentifier,
  zodTokens
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

const createZodUnion = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.union
);
export const union = Object.assign(createZodUnion, {
  t: buildSharedZodMemberCreators(zodTokens.union)
});

const createZodEnum = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.enum
);

const enum_ = Object.assign(createZodEnum, {
  t: buildSharedZodMemberCreators(zodTokens.enum)
});

export { enum_ as enum };

const createZodLiteral = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.literal
);

export const literal = Object.assign(createZodLiteral, {
  t: buildSharedZodMemberCreators(zodTokens.literal)
});

const createZodPromise = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.promise
);

export const promise = Object.assign(createZodPromise, {
  t: buildSharedZodMemberCreators(zodTokens.promise)
});

const createZodOptional = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.optional
);

export const optional = Object.assign(createZodOptional, {
  t: buildSharedZodMemberCreators(zodTokens.optional)
});

const createZodAny = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.any
);
const any_ = Object.assign(createZodAny, {
  t: buildSharedZodMemberCreators(zodTokens.any)
});

export { any_ as any };

const createZodUnknown = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.unknown
);

const unknown_ = Object.assign(createZodUnknown, {
  t: buildSharedZodMemberCreators(zodTokens.unknown)
});

export { unknown_ as unknown };

const createZodBigint = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.bigint
);

const bigint_ = Object.assign(createZodBigint, {
  t: buildSharedZodMemberCreators(zodTokens.bigint)
});

export { bigint_ as bigint };

const createZodDate = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.date
);
const date = Object.assign(createZodDate, {
  t: buildSharedZodMemberCreators(zodTokens.date)
});

const createZodFunction = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.function
);

const function_ = Object.assign(createZodFunction, {
  t: buildSharedZodMemberCreators(zodTokens.function)
});

export { function_ as function };

const createZodNull = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.null
);

const null_ = Object.assign(createZodNull, {
  t: buildSharedZodMemberCreators(zodTokens.null)
});

export { null_ as null };

const createZodUndefined = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.undefined
);

const undefined_ = Object.assign(createZodUndefined, {
  t: buildSharedZodMemberCreators(zodTokens.undefined)
});

export { undefined_ as undefined };

const createZodNever = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.never
);
const never_ = Object.assign(createZodNever, {
  t: buildSharedZodMemberCreators(zodTokens.never)
});
export { never_ as never };

const createZodVoid = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.void
);

const void_ = Object.assign(createZodVoid, {
  t: buildSharedZodMemberCreators(zodTokens.void)
});
export { void_ as void };

const createZodNullable = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.nullable
);

export const nullable = Object.assign(createZodNullable, {
  t: buildSharedZodMemberCreators(zodTokens.nullable)
});

const createZodCustom = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.custom
);

export const custom = Object.assign(createZodCustom, {
  t: buildSharedZodMemberCreators(zodTokens.custom)
});

const createZodMap = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.map
);
export const map = Object.assign(createZodMap, {
  t: buildSharedZodMemberCreators(zodTokens.map)
});

const createZodRecord = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.record
);
export const record = Object.assign(createZodRecord, {
  t: buildSharedZodMemberCreators(zodTokens.record)
});

const createZodTuple = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.tuple
);
export const tuple = Object.assign(createZodTuple, {
  t: buildSharedZodMemberCreators(zodTokens.tuple)
});

const createZodIntersection = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.intersection
);

export const intersection = Object.assign(createZodIntersection, {
  t: buildSharedZodMemberCreators(zodTokens.intersection)
});

const createZodNan = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.nan
);
export const nan = Object.assign(createZodNan, {
  t: buildSharedZodMemberCreators(zodTokens.nan)
});
const createZodOboolean = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.oboolean
);
export const oboolean = Object.assign(createZodOboolean, {
  t: buildSharedZodMemberCreators(zodTokens.oboolean)
});

const createZodDiscriminatedUnion = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.discriminatedUnion
);

export const discriminatedUnion = Object.assign(createZodDiscriminatedUnion, {
  t: buildSharedZodMemberCreators(zodTokens.discriminatedUnion)
});

const createZodInstanceOf = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.instanceof
);
export const instanceOf = Object.assign(createZodInstanceOf, {
  t: buildSharedZodMemberCreators(zodTokens.instanceof)
});

const createZodOnumber = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.onumber
);
export const onumber = Object.assign(createZodOnumber, {
  t: buildSharedZodMemberCreators(zodTokens.onumber)
});

const createZodOstring = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.ostring
);
export const ostring = Object.assign(createZodOstring, {
  t: buildSharedZodMemberCreators(zodTokens.ostring)
});

const createZodNativeEnum = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.nativeEnum
);
export const nativeEnum = Object.assign(createZodNativeEnum, {
  t: buildSharedZodMemberCreators(zodTokens.nativeEnum)
});

const createZodLazy = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.lazy
);
export const lazy = Object.assign(createZodLazy, {
  t: buildSharedZodMemberCreators(zodTokens.lazy)
});
const createZodTransformer = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.transformer
);
export const transformer = Object.assign(createZodTransformer, {
  t: buildSharedZodMemberCreators(zodTokens.transformer)
});

const createZodEffect = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.effect
);
export const effect = Object.assign(createZodEffect, {
  t: buildSharedZodMemberCreators(zodTokens.effect)
});

const createZodPipeline = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.pipeline
);

export const pipeline = Object.assign(createZodPipeline, {
  t: buildSharedZodMemberCreators(zodTokens.pipeline)
});

const createZodPreprocess = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.preprocess
);
export const preprocess = Object.assign(createZodPreprocess, {
  t: buildSharedZodMemberCreators(zodTokens.preprocess)
});

const createZodSymbol = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.symbol
);
export const symbol = Object.assign(createZodSymbol, {
  t: buildSharedZodMemberCreators(zodTokens.symbol)
});

const createZodStrictObject = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.strictObject
);
export const strictObject = Object.assign(createZodStrictObject, {
  t: buildSharedZodMemberCreators(zodTokens.strictObject)
});
