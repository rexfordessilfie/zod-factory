import { zodTokens, zodBooleanMembers } from "../utils";
import { callExpressionCreatorWithTarget, zodIdentifier } from "../utils/ast";
import { buildSharedZodMemberCreators } from "./shared";

export const createZodBoolean = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.boolean
);

export const booleanMemberCreators = {
  ...buildSharedZodMemberCreators(zodTokens.boolean),
} as const satisfies Partial<Record<keyof typeof zodBooleanMembers, any>>;
