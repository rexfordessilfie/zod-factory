import {
  zodTokens,
  callExpressionCreatorWithTarget,
  zodIdentifier
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

const createZodBoolean = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.boolean
);

export const boolean = Object.assign(createZodBoolean, {
  t: buildSharedZodMemberCreators(zodTokens.boolean)
});
