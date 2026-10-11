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

// Select the display and number buttons from the HTML
const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");

// Select operators and equals buttons
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");

// State variables for building out expressions
let displayValue = "";
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;

// Number button logic
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const digit = button.getAttribute("data-number");
    displayValue += digit;
    display.textContent = displayValue;
  });
});

// Operator button logic
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const chosenOperator = button.getAttribute("data-operator");

    // If we already have an active calculation queued up, evaluate it first (chaining)
    if (currentOperator !== null && secondNumber !== "") {
      firstNumber = operate(currentOperator, firstNumber, secondNumber);
      display.textContent = firstNumber;
      secondNumber = "";
    } else if (firstNumber === "") {
      // If no first number was stored yet, grab what's on the screen
      firstNumber = displayValue;
    }

    currentOperator = chosenOperator;
    displayValue = ""; // Reset display for the next number entry
  });
});

// Equals button logic
equalsButton.addEventListener("click", () => {
  if (currentOperator === null || firstNumber === "" || displayValue === "") return;

  secondNumber = displayValue;
  let result = operate(currentOperator, firstNumber, secondNumber);
  
  // Handle division by zero edge case gracefully
  if (typeof result === "string") {
    display.textContent = result;
  } else {
    // Round long decimals to prevent overflow
    result = Math.round(result * 100000000) / 100000000;
    display.textContent = result;
  }

  // Reset state for the next calculation, keeping result as firstNumber
  firstNumber = result;
  currentOperator = null;
  secondNumber = "";
  displayValue = "";
});

// Clear button logic
clearButton.addEventListener("click", () => {
  displayValue = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  display.textContent = "0"; // or your default initial text
});