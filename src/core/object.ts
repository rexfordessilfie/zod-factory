import {
  zodTokens,
  zodObjectMembers,
  callExpressionCreatorWithTarget,
  zodIdentifier,
  callExpressionCreatorWithFactoryType
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

export const objectMemberCreators = {
  partial: callExpressionCreatorWithFactoryType(
    zodTokens.partial,
    zodTokens.object
  ),
  strict: callExpressionCreatorWithFactoryType(
    zodTokens.strict,
    zodTokens.object
  ),
  deepPartial: callExpressionCreatorWithFactoryType(
    zodTokens.deepPartial,
    zodTokens.object
  ),
  nonstrict: callExpressionCreatorWithFactoryType(
    zodTokens.nonstrict,
    zodTokens.object
  )
} as const satisfies Partial<Record<keyof typeof zodObjectMembers, any>>;

export const createZodObject = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.object
);

export const _object = Object.assign(createZodObject, {
  t: Object.assign(
    objectMemberCreators,
    buildSharedZodMemberCreators(zodTokens.object)
  )
});
