import {
  zodTokens,
  zodDateMembers,
  callExpressionCreatorWithFactoryType,
  callExpressionCreatorWithTarget,
  zodIdentifier,
  createEnrichedFactory
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

const dateMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.date),
  max: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.date)
} as const satisfies Partial<Record<keyof typeof zodDateMembers, any>>;

const createZodDate = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.date
);

const allDateMembers = Object.assign(
  dateMemberCreators,
  buildSharedZodMemberCreators(zodTokens.date)
);

export const date = Object.assign(
  createEnrichedFactory(createZodDate, allDateMembers),
  { of: allDateMembers }
);
