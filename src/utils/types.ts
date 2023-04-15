import { zodTokens } from "./constants";
export type ValueOf<T extends Record<string, any>> = T[keyof T];
export type ZodToken = ValueOf<typeof zodTokens>;
