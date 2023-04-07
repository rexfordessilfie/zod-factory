import {
  zodTokens,
  zodArrayMembers,
  zodIdentifier,
  callExpressionCreatorWithTarget,
  callExpressionCreatorWithFactoryType,
  callExpressionCreatorWithPreviousType
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

export const arrayMemberCreators = {
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

export const createZodArray = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.array
);

export const _array = Object.assign(createZodArray, {
  t: Object.assign(
    arrayMemberCreators,
    buildSharedZodMemberCreators(zodTokens.array)
  )
});
