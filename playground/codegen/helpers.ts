type Parsed = {
  schemaDestinations: string[];
  directory: string;
};

const argConfig = {
  directory: {
    regex: /(-d|--directory)/,
  },
} satisfies Partial<Record<keyof Parsed, any>>;

export const parseArguments = (args: string[]): Parsed => {
  const argsCopy = [...args];

  const parsed: Parsed = {} as Parsed;

  while (argsCopy.length) {
    const arg = argsCopy.shift();

    if (!arg) continue;

    if (argConfig.directory.regex.test(arg)) {
      parsed.directory = argsCopy.shift() || ".";
    } else {
      parsed.schemaDestinations = parsed.schemaDestinations ?? [];
      parsed.schemaDestinations.push(arg);
    }
  }

  return parsed as Parsed;
};
