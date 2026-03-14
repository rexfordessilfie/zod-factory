import {
  zodTokens,
  callExpressionCreatorWithTarget,
  zodIdentifier,
  createEnrichedFactory
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

const createZodBoolean = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.boolean
);

const allBooleanMembers = buildSharedZodMemberCreators(zodTokens.boolean);

export const boolean = Object.assign(
  createEnrichedFactory(createZodBoolean, allBooleanMembers),
  { of: allBooleanMembers }
);
