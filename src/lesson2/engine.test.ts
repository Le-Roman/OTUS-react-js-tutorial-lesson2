import {
  firstPrioritiesCalc,
  secondPrioritiesCalc,
  thirdPrioritiesCalc,
  calculation,
} from "./engine";

test("firstPrioritiesCalc: [4, ^, 2]", () => {
  expect(firstPrioritiesCalc([4, "^", 2])).toEqual([16]);
});

test("firstPrioritiesCalc: [2, ^, 2, +, 4]", () => {
  expect(firstPrioritiesCalc([2, "^", 2, "+", 4])).toEqual([4, "+", 4]);
});

test("secondPrioritiesCalc: [1, * 32]", () => {
  expect(secondPrioritiesCalc([1, "*", 32])).toEqual([32]);
});

test("secondPrioritiesCalc: [32, / 32]", () => {
  expect(secondPrioritiesCalc([32, "/", 32])).toEqual([1]);
});

test("thirdPrioritiesCalc: [32, + 32]", () => {
  expect(thirdPrioritiesCalc([32, "+", 32])).toEqual([64]);
});

test("thirdPrioritiesCalc: [32, - 32]", () => {
  expect(thirdPrioritiesCalc([32, "-", 32])).toEqual([0]);
});

test("calculation: [42, -, 32]", () => {
  expect(calculation([42, "-", 32])).toEqual(10);
});

test("calculation: [32, *, 2, +, 36]", () => {
  expect(calculation([32, "*", 2, "+", 36])).toEqual(100);
});

test("calculation: [2, ^, 2, *, 2, +, 2]", () => {
  expect(calculation([2, "^", 2, "*", 2, "+", 2])).toEqual(10);
});
