import { zodStringMembers, zodTokens } from "../utils";
import {
  zodIdentifier,
  callExpressionCreatorWithTarget,
  callExpressionCreatorWithFactoryType,
} from "../utils/ast";
import { buildSharedZodMemberCreators } from "./shared";

export const createZodString = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.string
);

export const stringMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.string),
  max: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.string),
  uuid: callExpressionCreatorWithFactoryType(zodTokens.uuid, zodTokens.string),
  email: callExpressionCreatorWithFactoryType(
    zodTokens.email,
    zodTokens.string
  ),
  nonempty: callExpressionCreatorWithFactoryType(
    zodTokens.nonempty,
    zodTokens.string
  ),
  startsWith: callExpressionCreatorWithFactoryType(
    zodTokens.startsWith,
    zodTokens.string
  ),
  endsWith: callExpressionCreatorWithFactoryType(
    zodTokens.endsWith,
    zodTokens.string
  ),
  ...buildSharedZodMemberCreators(zodTokens.string),
} as const satisfies Partial<Record<keyof typeof zodStringMembers, any>>;
