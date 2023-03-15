import { zodTokens, zodArrayMembers, zodSetMembers } from "../utils";
import {
  zodIdentifier,
  callExpressionCreatorWithTarget,
  callExpressionCreatorWithFactoryType,
  callExpressionCreatorWithPreviousType,
} from "../utils/ast";
import { buildSharedZodMemberCreators } from "./shared";

export const createZodArray = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.set
);

export const setMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.set),
  max: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.set),
  size: callExpressionCreatorWithFactoryType(zodTokens.size, zodTokens.set),
  nonempty: callExpressionCreatorWithFactoryType(
    zodTokens.nonempty,
    zodTokens.set
  ),
  ...buildSharedZodMemberCreators(zodTokens.set),
} as const satisfies Partial<Record<keyof typeof zodSetMembers, any>>;
