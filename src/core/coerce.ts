import {
  zodTokens,
  zodCoerceMembers,
  callExpressionCreator,
  propertyAccessExpressionCreatorWithTarget,
  zodIdentifier
} from "../utils";

const coerceMemberCreators = {
  string: callExpressionCreator(zodTokens.string),
  number: callExpressionCreator(zodTokens.number),
  boolean: callExpressionCreator(zodTokens.boolean),
  date: callExpressionCreator(zodTokens.date),
  bigint: callExpressionCreator(zodTokens.bigint)
} as const satisfies Partial<Record<keyof typeof zodCoerceMembers, any>>;

const createZodCoerce = propertyAccessExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.coerce
);

export const coerce = Object.assign(createZodCoerce, {
  t: coerceMemberCreators
});
