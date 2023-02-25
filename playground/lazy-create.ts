import { lazyCreate } from "../src/core";
import { zodTokens } from "../src/utils";

export const expression = lazyCreate([
  [
    zodTokens.object,
    {
      name: lazyCreate([[zodTokens.string], [zodTokens.max, 20]]),
      age: lazyCreate([[zodTokens.number], [zodTokens.min, 18]]),
    },
  ],
]);

export const expression2 = lazyCreate([[zodTokens.coerce], [zodTokens.string]]);
