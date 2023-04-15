import {
  zodTokens,
  zodArrayMembers,
  zodIdentifier,
  callExpressionCreatorWithTarget,
  callExpressionCreatorWithFactoryType,
  callExpressionCreatorWithPreviousType
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

const arrayMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.array),
  max: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.array),
  length: callExpressionCreatorWithFactoryType(
    zodTokens.length,
    zodTokens.array
  ),
  element: callExpressionCreatorWithPreviousType(zodTokens.element),
  nonempty: callExpressionCreatorWithFactoryType(
    zodTokens.nonempty,
    zodTokens.array
  )
} as const satisfies Partial<Record<keyof typeof zodArrayMembers, any>>;

const createZodArray = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.array
);

export const array = Object.assign(createZodArray, {
  of: Object.assign(
    arrayMemberCreators,
    buildSharedZodMemberCreators(zodTokens.array)
  )
});
