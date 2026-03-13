import {
  zodTokens,
  zodObjectMembers,
  callExpressionCreatorWithTarget,
  zodIdentifier,
  callExpressionCreatorWithFactoryType,
  createEnrichedFactory
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
  ),
  passthrough: callExpressionCreatorWithFactoryType(zodTokens.passthrough, zodTokens.object),
  strip: callExpressionCreatorWithFactoryType(zodTokens.strip, zodTokens.object),
  keyof: callExpressionCreatorWithFactoryType(zodTokens.keyof, zodTokens.object),
  required: callExpressionCreatorWithFactoryType(zodTokens.required, zodTokens.object),
  pick: callExpressionCreatorWithFactoryType(zodTokens.pick, zodTokens.object),
  omit: callExpressionCreatorWithFactoryType(zodTokens.omit, zodTokens.object),
  extend: callExpressionCreatorWithFactoryType(zodTokens.extend, zodTokens.object),
  augment: callExpressionCreatorWithFactoryType(zodTokens.augment, zodTokens.object),
  merge: callExpressionCreatorWithFactoryType(zodTokens.merge, zodTokens.object),
  catchall: callExpressionCreatorWithFactoryType(zodTokens.catchall, zodTokens.object),
  setKey: callExpressionCreatorWithFactoryType(zodTokens.setKey, zodTokens.object)
} as const satisfies Partial<Record<keyof typeof zodObjectMembers, any>>;

const createZodObject = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.object
);

const allObjectMembers = Object.assign(
  objectMemberCreators,
  buildSharedZodMemberCreators(zodTokens.object)
);

export const object = Object.assign(
  createEnrichedFactory(createZodObject, allObjectMembers),
  { of: allObjectMembers }
);
