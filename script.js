function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Cannot divide by zero!";
  }
  return a / b;
}

let operator = null;

function operate(operator, a, b) {
  // Convert inputs to numbers just in case they are strings from the DOM later
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null; // Return null if an invalid operator is passed
  }
}

const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");

let displayValue = "";
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false; // Tracks if a result was just shown

// Number button logic
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // If a result was just calculated, typing a new digit clears the screen first
    if (shouldResetDisplay) {
      displayValue = "";
      shouldResetDisplay = false;
    }

    const digit = button.getAttribute("data-number");
    displayValue += digit;
    display.textContent = displayValue;
  });
});

// Operator button logic
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const chosenOperator = button.getAttribute("data-operator");

    // Guard: If user presses an operator consecutively (e.g., 2 + +), 
    // don't evaluate, just update the active operator.
    if (displayValue === "" && currentOperator !== null) {
      currentOperator = chosenOperator;
      return;
    }

    if (firstNumber === "") {
      firstNumber = displayValue;
    } else if (currentOperator !== null) {
      // Evaluate current pair if we already have two numbers and an operator
      secondNumber = displayValue;
      firstNumber = operate(currentOperator, firstNumber, secondNumber);
      
      if (typeof firstNumber === "string") {
        display.textContent = firstNumber;
        return;
      } else {
        firstNumber = Math.round(firstNumber * 100000000) / 100000000;
        display.textContent = firstNumber;
      }
    }

    currentOperator = chosenOperator;
    displayValue = "";
    shouldResetDisplay = false;
  });
});

// Equals button logic
equalsButton.addEventListener("click", () => {
  // Guard: Don't crash if data is missing
  if (currentOperator === null || firstNumber === "" || displayValue === "") return;

  secondNumber = displayValue;
  let result = operate(currentOperator, firstNumber, secondNumber);

  if (typeof result === "string") {
    display.textContent = result; // Snarky error message
  } else {
    result = Math.round(result * 100000000) / 100000000;
    display.textContent = result;
  }

  // Reset state for next calculation, flagging that display needs reset on next number click
  firstNumber = result;
  currentOperator = null;
  secondNumber = "";
  displayValue = "";
  shouldResetDisplay = true;
});

// Clear button logic
clearButton.addEventListener("click", () => {
  displayValue = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
  display.textContent = "0";
});

// Make sure your divide function has a snarky message:
function divide(a, b) {
  if (b === 0) {
    return "Nice try, Einstein!"; // Snarky error message
  }
  return a / b;
}