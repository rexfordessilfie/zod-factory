import {
  zodTokens,
  zodSharedMembers,
  callExpressionCreator,
  callExpressionCreatorWithFactoryType,
  ZodToken
} from "../utils";

/**
 * Builds the set of member creators shared across all Zod types.
 *
 * Includes type-changing methods (`.array()`, `.transform()`, `.pipe()`, etc.)
 * whose `_zfType` becomes the method name, and type-preserving methods
 * (`.optional()`, `.nullable()`, `.describe()`, etc.) whose `_zfType` stays
 * as the provided `type` parameter.
 *
 * @param type - The Zod type token to preserve for type-preserving methods.
 *   If omitted, the method name is used as the fallback type.
 */
export function buildSharedZodMemberCreators<T extends ZodToken>(type?: T) {
  return {
    // Type changing methods
    promise: callExpressionCreator(zodTokens.promise),
    and: callExpressionCreator(zodTokens.and),
    or: callExpressionCreator(zodTokens.or),
    array: callExpressionCreator(zodTokens.array),
    pipe: callExpressionCreator(zodTokens.pipe),
    default: callExpressionCreator(zodTokens.default),
    brand: callExpressionCreator(zodTokens.brand),
    transform: callExpressionCreator(zodTokens.transform),
    refine: callExpressionCreator(zodTokens.refine),
    superRefine: callExpressionCreator(zodTokens.superRefine),

    // Type preserving methods
    describe: callExpressionCreatorWithFactoryType(
      zodTokens.describe,
      type || zodTokens.describe
    ),
    nullable: callExpressionCreatorWithFactoryType(
      zodTokens.nullable,
      type || zodTokens.nullable
    ),
    optional: callExpressionCreatorWithFactoryType(
      zodTokens.optional,
      type || zodTokens.optional
    ),
    nullish: callExpressionCreatorWithFactoryType(
      zodTokens.nullish,
      type || zodTokens.nullish
    ),
    catch: callExpressionCreatorWithFactoryType(
      zodTokens.catch,
      type || zodTokens.catch
    )
  } as const satisfies Partial<Record<keyof typeof zodSharedMembers, any>>;
}

/** Default shared member creators without a specific type context. */
export const of = buildSharedZodMemberCreators();
