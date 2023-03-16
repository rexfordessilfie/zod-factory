import { zodStringMembers, zodTokens } from "../utils";
import {
  zodIdentifier,
  callExpressionCreatorWithTarget,
  callExpressionCreatorWithFactoryType,
} from "../utils/ast";
import { buildSharedZodMemberCreators } from "./shared";

export const createZodString = callExpressionCreatorWithTarget(
  zodIdentifier,
  zodTokens.string
);

export const stringMemberCreators = {
  min: callExpressionCreatorWithFactoryType(zodTokens.min, zodTokens.string),
  max: callExpressionCreatorWithFactoryType(zodTokens.max, zodTokens.string),
  uuid: callExpressionCreatorWithFactoryType(zodTokens.uuid, zodTokens.string),
  email: callExpressionCreatorWithFactoryType(
    zodTokens.email,
    zodTokens.string
  ),
  nonempty: callExpressionCreatorWithFactoryType(
    zodTokens.nonempty,
    zodTokens.string
  ),
  startsWith: callExpressionCreatorWithFactoryType(
    zodTokens.startsWith,
    zodTokens.string
  ),
  endsWith: callExpressionCreatorWithFactoryType(
    zodTokens.endsWith,
    zodTokens.string
  ),
  cuid: callExpressionCreatorWithFactoryType(zodTokens.cuid, zodTokens.string),
  cuid2: callExpressionCreatorWithFactoryType(
    zodTokens.cuid2,
    zodTokens.string
  ),
  url: callExpressionCreatorWithFactoryType(zodTokens.url, zodTokens.string),
  regex: callExpressionCreatorWithFactoryType(
    zodTokens.regex,
    zodTokens.string
  ),
  trim: callExpressionCreatorWithFactoryType(zodTokens.trim, zodTokens.string),
  emoji: callExpressionCreatorWithFactoryType(
    zodTokens.emoji,
    zodTokens.string
  ),
  toLowerCase: callExpressionCreatorWithFactoryType(
    zodTokens.toLowerCase,
    zodTokens.string
  ),
  toUpperCase: callExpressionCreatorWithFactoryType(
    zodTokens.toUpperCase,
    zodTokens.string
  ),
  ulid: callExpressionCreatorWithFactoryType(zodTokens.ulid, zodTokens.string),
  includes: callExpressionCreatorWithFactoryType(
    zodTokens.includes,
    zodTokens.string
  ),
  length: callExpressionCreatorWithFactoryType(
    zodTokens.length,
    zodTokens.string
  ),
  ip: callExpressionCreatorWithFactoryType(zodTokens.ip, zodTokens.string),
  datetime: callExpressionCreatorWithFactoryType(
    zodTokens.datetime,
    zodTokens.string
  ),
  ...buildSharedZodMemberCreators(zodTokens.string),
} as const satisfies Record<keyof typeof zodStringMembers, any>;
