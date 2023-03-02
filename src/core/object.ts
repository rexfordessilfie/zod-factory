import { zodTokens, zodObjectMembers } from "../utils";
import {
  callExpressionCreatorWithTarget,
  zodIdentifier,
  callExpressionCreatorWithFactoryType,
} from "../utils/ast";
import { buildSharedZodMemberCreators } from "./shared";

export const createZodObject = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.object
);
export const objectMemberCreators = {
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
  ...buildSharedZodMemberCreators(zodTokens.object),
} as const satisfies Partial<Record<keyof typeof zodObjectMembers, any>>;
