import { zodTokens, zodArrayMembers } from "../utils";
import {
  zodIdentifier,
  callExpressionCreatorWithTarget,
  callExpressionCreatorWithFactoryType,
  callExpressionCreatorWithPreviousType,
} from "../utils/ast";
import { buildSharedZodMemberCreators } from "./shared";

export const createZodArray = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.array
);

export const arrayMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.array),
  max: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.array),
  length: callExpressionCreatorWithFactoryType(
    zodTokens.length,
    zodTokens.array
  ),
  element: callExpressionCreatorWithPreviousType(zodTokens.element),
  nonempty: callExpressionCreatorWithFactoryType(
    zodTokens.nonempty,
    zodTokens.array
  ),
  ...buildSharedZodMemberCreators(zodTokens.array),
} as const satisfies Partial<Record<keyof typeof zodArrayMembers, any>>;
