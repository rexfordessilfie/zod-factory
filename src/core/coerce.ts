import { zodTokens, zodCoerceMembers } from "../utils";
import {
  callExpressionCreator,
  propertyAccessExpressionCreatorWithTarget,
  zodIdentifier,
} from "../utils/ast";

export const createZodCoerce = propertyAccessExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.coerce
);

export const coerceMemberCreators = {
  string: callExpressionCreator(zodTokens.string),
  number: callExpressionCreator(zodTokens.number),
  boolean: callExpressionCreator(zodTokens.boolean),
  date: callExpressionCreator(zodTokens.date),
  bigint: callExpressionCreator(zodTokens.bigint),
} as const satisfies Partial<Record<keyof typeof zodCoerceMembers, any>>;
