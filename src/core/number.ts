import {
  zodTokens,
  zodNumberMembers,
  callExpressionCreatorWithFactoryType,
  callExpressionCreatorWithTarget,
  zodIdentifier
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

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
  )
} as const satisfies Partial<Record<keyof typeof zodNumberMembers, any>>;

export const createZodNumber = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.number
);

export const _number = Object.assign(createZodNumber, {
  t: Object.assign(
    numberMemberCreators,
    buildSharedZodMemberCreators(zodTokens.number)
  )
});
