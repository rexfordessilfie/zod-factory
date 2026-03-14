import {
  callExpressionCreatorWithTarget,
  createEnrichedFactory,
  zodIdentifier,
  zodTokens,
  ZodToken
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

/**
 * Creates a Zod type factory for types that only have shared members (no type-specific methods).
 * Returns a callable factory with fluent API support and a `.of` namespace for the explicit API.
 *
 * @param token - The Zod type token (e.g. `zodTokens.union`, `zodTokens.literal`).
 */
function createSharedOnlyType(token: ZodToken) {
  const factory = callExpressionCreatorWithTarget(zodIdentifier(), token);
  const members = buildSharedZodMemberCreators(token);
  return Object.assign(createEnrichedFactory(factory, members), { of: members });
}

export const union = createSharedOnlyType(zodTokens.union);

const enum_ = createSharedOnlyType(zodTokens.enum);
export { enum_ as enum };

export const literal = createSharedOnlyType(zodTokens.literal);
export const promise = createSharedOnlyType(zodTokens.promise);
export const optional = createSharedOnlyType(zodTokens.optional);

const any_ = createSharedOnlyType(zodTokens.any);
export { any_ as any };

const unknown_ = createSharedOnlyType(zodTokens.unknown);
export { unknown_ as unknown };

const bigint_ = createSharedOnlyType(zodTokens.bigint);
export { bigint_ as bigint };

const function_ = createSharedOnlyType(zodTokens.function);
export { function_ as function };

const null_ = createSharedOnlyType(zodTokens.null);
export { null_ as null };

const undefined_ = createSharedOnlyType(zodTokens.undefined);
export { undefined_ as undefined };

const never_ = createSharedOnlyType(zodTokens.never);
export { never_ as never };

const void_ = createSharedOnlyType(zodTokens.void);
export { void_ as void };

export const nullable = createSharedOnlyType(zodTokens.nullable);
export const custom = createSharedOnlyType(zodTokens.custom);
export const map = createSharedOnlyType(zodTokens.map);
export const record = createSharedOnlyType(zodTokens.record);
export const tuple = createSharedOnlyType(zodTokens.tuple);
export const intersection = createSharedOnlyType(zodTokens.intersection);
export const nan = createSharedOnlyType(zodTokens.nan);
export const oboolean = createSharedOnlyType(zodTokens.oboolean);
export const discriminatedUnion = createSharedOnlyType(zodTokens.discriminatedUnion);

const instanceof_ = createSharedOnlyType(zodTokens.instanceof);
export { instanceof_ as instanceof };

export const onumber = createSharedOnlyType(zodTokens.onumber);
export const ostring = createSharedOnlyType(zodTokens.ostring);
export const nativeEnum = createSharedOnlyType(zodTokens.nativeEnum);
export const lazy = createSharedOnlyType(zodTokens.lazy);
export const transformer = createSharedOnlyType(zodTokens.transformer);
export const effect = createSharedOnlyType(zodTokens.effect);
export const pipeline = createSharedOnlyType(zodTokens.pipeline);
export const preprocess = createSharedOnlyType(zodTokens.preprocess);
export const symbol = createSharedOnlyType(zodTokens.symbol);
export const strictObject = createSharedOnlyType(zodTokens.strictObject);
