import {
  zodTokens,
  callExpressionCreatorWithTarget,
  zodIdentifier
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

export const createZodBoolean = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.boolean
);

export const _boolean = Object.assign(createZodBoolean, {
  t: buildSharedZodMemberCreators(zodTokens.boolean)
});
