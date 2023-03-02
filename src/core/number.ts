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
  ...buildSharedZodMemberCreators(zodTokens.number),
} as const satisfies Partial<Record<keyof typeof zodNumberMembers, any>>;
