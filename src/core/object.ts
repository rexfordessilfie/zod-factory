import {
  zodTokens,
  zodObjectMembers,
  callExpressionCreatorWithTarget,
  zodIdentifier,
  callExpressionCreatorWithFactoryType
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

const objectMemberCreators = {
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

const createZodObject = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.object
);

export const object = Object.assign(createZodObject, {
  of: Object.assign(
    objectMemberCreators,
    buildSharedZodMemberCreators(zodTokens.object)
  )
});
