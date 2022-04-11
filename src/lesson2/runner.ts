import { parser } from "./parser";

import { calculation } from "./engine";

export const runner = (line: string): number => {
  const stack = parser(line);

  if (stack === null) {
    throw new TypeError("Unexpected string");
  }

  return calculation(stack);
};
