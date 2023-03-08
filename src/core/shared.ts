import { zodTokens, zodSharedMembers } from "../utils";
import {
  ValueOf,
  callExpressionCreator,
  callExpressionCreatorWithFactoryType,
} from "../utils/ast";

export function buildSharedZodMemberCreators<
  T extends ValueOf<typeof zodTokens>
>(type: T) {
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
    catch: callExpressionCreatorWithFactoryType(zodTokens.catch, type),
  } as const satisfies Partial<Record<keyof typeof zodSharedMembers, any>>;
}
