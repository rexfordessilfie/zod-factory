import {
  zodTokens,
  zodSetMembers,
  zodIdentifier,
  callExpressionCreatorWithTarget,
  callExpressionCreatorWithFactoryType,
  createEnrichedFactory
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

const createZodSet = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.set
);

const setMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.set),
  max: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.set),
  size: callExpressionCreatorWithFactoryType(zodTokens.size, zodTokens.set),
  nonempty: callExpressionCreatorWithFactoryType(
    zodTokens.nonempty,
    zodTokens.set
  )
} as const satisfies Partial<Record<keyof typeof zodSetMembers, any>>;

const allSetMembers = Object.assign(
  setMemberCreators,
  buildSharedZodMemberCreators(zodTokens.set)
);

const set_ = Object.assign(
  createEnrichedFactory(createZodSet, allSetMembers),
  { of: allSetMembers }
);

export { set_ as set };
