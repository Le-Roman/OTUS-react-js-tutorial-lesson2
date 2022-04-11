import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
} from "./mathOperators";

const { FIRST, SECOND, THIRD } = mathPriorities;

export const firstPrioritiesCalc = (stack: ParsedLineType): ParsedLineType => {
  let result: ParsedLineType = [];

  for (let key = 0; key < stack.length; key++) {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];
    const nextItem = stack[key];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === FIRST) {
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
  }

  return result;
};

export const secondPrioritiesCalc = (stack: ParsedLineType): ParsedLineType => {
  let result: ParsedLineType = [];

  for (let key = 0; key < stack.length; key++) {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];
    const nextItem = stack[key];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === SECOND) {
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
  }

  return result;
};

export const thirdPrioritiesCalc = (stack: ParsedLineType): ParsedLineType => {
  let result = [];
  for (let key = 0; key < stack.length; key++) {
    if (key === 0) {
      result = [];
      result.push(Number(stack[key]));
    }

    const prevItem = result;
    const item = stack[key - 1];
    const nextItem = stack[key];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === THIRD) {
      result = [];
      result.push(mathOperators[item](Number(prevItem), Number(nextItem)));
    }
  }
  return result;
};

const prioritiesCalc = [
  firstPrioritiesCalc,
  secondPrioritiesCalc,
  thirdPrioritiesCalc,
];

export const calculation = (stack: ParsedLineType): number => {
  let result: number;
  let iterationStack: ParsedLineType = stack;

  for (let i = 0; i < prioritiesCalc.length; i++) {
    const calc = prioritiesCalc[i];
    iterationStack = calc(iterationStack);

    if (iterationStack.length === 1) {
      result = Number(calc(iterationStack)[0]);
    }
  }

  return result;
};
