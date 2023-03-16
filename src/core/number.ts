import { zodTokens, zodNumberMembers } from "../utils";
import {
  callExpressionCreatorWithFactoryType,
  callExpressionCreatorWithTarget,
  zodIdentifier,
} from "../utils/ast";
import { buildSharedZodMemberCreators } from "./shared";

export const createZodNumber = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.number
);

export const numberMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.number),
  max: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.number),
  int: callExpressionCreatorWithFactoryType(zodTokens.int, zodTokens.number),
  positive: callExpressionCreatorWithFactoryType(
    zodTokens.positive,
    zodTokens.number
  ),
  negative: callExpressionCreatorWithFactoryType(
    zodTokens.negative,
    zodTokens.number
  ),
  nonpositive: callExpressionCreatorWithFactoryType(
    zodTokens.nonpositive,
    zodTokens.number
  ),
  nonnegative: callExpressionCreatorWithFactoryType(
    zodTokens.nonnegative,
    zodTokens.number
  ),
  multipleOf: callExpressionCreatorWithFactoryType(
    zodTokens.multipleOf,
    zodTokens.number
  ),
  finite: callExpressionCreatorWithFactoryType(
    zodTokens.finite,
    zodTokens.number
  ),
  ...buildSharedZodMemberCreators(zodTokens.number),
} as const satisfies Partial<Record<keyof typeof zodNumberMembers, any>>;
