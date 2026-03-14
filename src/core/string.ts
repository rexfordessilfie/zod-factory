import {
  zodStringMembers,
  zodTokens,
  zodIdentifier,
  callExpressionCreatorWithTarget,
  callExpressionCreatorWithFactoryType,
  createEnrichedFactory
} from "../utils";
import { buildSharedZodMemberCreators } from "./shared";

const stringMemberCreators = {
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
  ip: callExpressionCreatorWithFactoryType(zodTokens.ip, zodTokens.string),
  ulid: callExpressionCreatorWithFactoryType(zodTokens.ulid, zodTokens.string),
  emoji: callExpressionCreatorWithFactoryType(zodTokens.emoji, zodTokens.string),
  length: callExpressionCreatorWithFactoryType(zodTokens.length, zodTokens.string),
  datetime: callExpressionCreatorWithFactoryType(zodTokens.datetime, zodTokens.string),
  toLowerCase: callExpressionCreatorWithFactoryType(zodTokens.toLowerCase, zodTokens.string),
  toUpperCase: callExpressionCreatorWithFactoryType(zodTokens.toUpperCase, zodTokens.string),
  includes: callExpressionCreatorWithFactoryType(zodTokens.includes, zodTokens.string)
} as const satisfies Partial<Record<keyof typeof zodStringMembers, any>>;

const createZodString = callExpressionCreatorWithTarget(
  zodIdentifier(),
  zodTokens.string
);

const allStringMembers = Object.assign(
  stringMemberCreators,
  buildSharedZodMemberCreators(zodTokens.string)
);

const string_ = Object.assign(
  createEnrichedFactory(createZodString, allStringMembers),
  { of: allStringMembers }
);

export { string_ as string };
