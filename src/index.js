function eval() {
    // Do not use eval!!!
    return;
}
const operators = ["+", "-", "*", "/"];

function getOperatorPriority(operator) {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
  }
}

function expressionCalculator(expr) {
  const stack = [];
  let lastToken;
  const rpn = expr
    .split("")
    .reduce((result, token, i, exprArr) => {
      if (token === " ") {
        return result;
      }
      if (!Number.isNaN(Number(token))) {
        if (lastToken && !operators.includes(lastToken) && lastToken !== "(") {
          result[result.length - 1] += token;
        } else {
          result.push(token);
        }
      } else if (operators.includes(token)) {
        while (
          operators.includes(stack[stack.length - 1]) &&
          getOperatorPriority(token) <=
            getOperatorPriority(stack[stack.length - 1])
        ) {
          result.push(stack.pop());
        }
        stack.push(token);
      } else if (token === "(") {
        stack.push(token);
      } else if (token === ")") {
        let operator;
        while ((operator = stack.pop()) && operator !== "(") {
          result.push(operator);
        }
        if (typeof operator === "undefined") {
          throw new Error("ExpressionError: Brackets must be paired");
        }
      }
      lastToken = token;
      return result;
    }, [])
    .concat(stack.reverse());

  if (stack.includes("(")) {
    throw new Error("ExpressionError: Brackets must be paired");
  }

  return rpn.reduce((result, item) => {
    if (!operators.includes(item)) {
      result.push(Number(item));
      return result;
    }
    const firstOperand = result.pop();
    const secondOperand = result.pop();
    switch (item) {
      case "+":
        result.push(firstOperand + secondOperand);
        return result;
      case "-":
        result.push(secondOperand - firstOperand);
        return result;
      case "/":
        if (firstOperand === 0) {
          throw new Error("TypeError: Division by zero.");
        }
        result.push(secondOperand / firstOperand);
        return result;
      case "*":
        result.push(firstOperand * secondOperand);
        return result;
    }
  }, [])[0];
}

module.exports = {
  expressionCalculator,
};
