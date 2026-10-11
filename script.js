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
    return "Nice try, Einstein!";
  }
  return a / b;
}

function operate(operator, a, b) {
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
      return null;
  }
}

const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const backspaceButton = document.querySelector("#backspace");

let displayValue = "";
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

// Helper Logic Functions
function handleNumber(digit) {
  if (shouldResetDisplay) {
    displayValue = "";
    firstNumber = ""; // Cleanly wipe previous equation state on new entry
    shouldResetDisplay = false;
  }
  displayValue += digit;
  display.textContent = displayValue;
}

function handleDecimal() {
  if (shouldResetDisplay) {
    displayValue = "0";
    firstNumber = "";
    shouldResetDisplay = false;
  }
  if (!displayValue.includes(".")) {
    if (displayValue === "") {
      displayValue = "0";
    }
    displayValue += ".";
    display.textContent = displayValue;
  }
}

function handleOperator(chosenOperator) {
  // If we just finished an evaluation, use that result as our new firstNumber
  if (shouldResetDisplay) {
    shouldResetDisplay = false;
  }

  if (displayValue === "" && currentOperator !== null) {
    currentOperator = chosenOperator;
    return;
  }

  if (firstNumber === "") {
    firstNumber = displayValue;
  } else if (currentOperator !== null) {
    secondNumber = displayValue;
    let result = operate(currentOperator, firstNumber, secondNumber);
    
    if (typeof result === "string") {
      display.textContent = result;
      return;
    } else {
      result = Math.round(result * 100000000) / 100000000;
      display.textContent = result;
      firstNumber = result;
    }
  }

  currentOperator = chosenOperator;
  displayValue = "";
}

function handleEquals() {
  if (currentOperator === null || firstNumber === "" || displayValue === "") return;

  secondNumber = displayValue;
  let result = operate(currentOperator, firstNumber, secondNumber);

  if (typeof result === "string") {
    display.textContent = result;
  } else {
    result = Math.round(result * 100000000) / 100000000;
    display.textContent = result;
  }

  firstNumber = result;
  currentOperator = null;
  secondNumber = "";
  displayValue = "";
  shouldResetDisplay = true;
}

function handleBackspace() {
  if (shouldResetDisplay) return;
  displayValue = displayValue.slice(0, -1);
  if (displayValue === "") {
    display.textContent = "0";
  } else {
    display.textContent = displayValue;
  }
}

function handleClear() {
  displayValue = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
  display.textContent = "0";
}

// Single set of event listeners binding to helpers
numberButtons.forEach((button) => {
  button.addEventListener("click", () => handleNumber(button.getAttribute("data-number")));
});

decimalButton.addEventListener("click", handleDecimal);

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.getAttribute("data-operator")));
});

equalsButton.addEventListener("click", handleEquals);
backspaceButton.addEventListener("click", handleBackspace);
clearButton.addEventListener("click", handleClear);

// Keyboard Support
window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    handleNumber(e.key);
  }
  if (e.key === ".") {
    handleDecimal();
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    handleEquals();
  }
  if (e.key === "Backspace") {
    handleBackspace();
  }
  if (e.key === "Escape") {
    handleClear();
  }
});