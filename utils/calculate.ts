const add = (first: number, second: number) => {
  return first + second;
};

const subtract = (first: number, second: number) => {
  return first - second;
};

const multiply = (first: number, second: number) => {
  return first * second;
};

const divide = (first: number, second: number) => {
  return first / second;
};

/**
 * calculates the result of the operation entered by the user
 * @param operation the operation entered by the user
 * @param first the first number entered by the user
 * @param second the second number entered by the user
 * @returns a number which is the result of the calculation
 */

export const calculate = (operation: string, first: number, second: number) => {
  let result: number;
  switch (operation) {
    case "add":
      result = add(first, second);
      break;
    case "subtract":
      result = subtract(first, second);
      break;
    case "multiply":
      result = multiply(first, second);
      break;
    case "divide":
      result = divide(first, second);
      break;
    default:
      throw new Error(`Unsupported operation ${operation}`);
  }
  return result
}

