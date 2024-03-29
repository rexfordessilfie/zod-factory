import { zfs, zodTokens } from "../../dist";

export const expression = zfs([
  [
    zodTokens.object,
    {
      name: zfs([[zodTokens.string], [zodTokens.max, 20]]),
      age: zfs([[zodTokens.number], [zodTokens.min, 18]]),
    },
  ],
]);

export const expression2 = zfs([[zodTokens.coerce], [zodTokens.string]]);
