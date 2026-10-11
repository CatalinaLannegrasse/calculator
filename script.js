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
const decimalButton = document.querySelector("#decimal"); // Adjust selector if you used a class instead
const backspaceButton = document.querySelector("#backspace");

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

decimalButton.addEventListener("click", () => {
  // If a result was just shown, typing a decimal starts a new number "0."
  if (shouldResetDisplay) {
    displayValue = "0";
    shouldResetDisplay = false;
  }

  // If the current number doesn't already have a decimal point, add one
  if (!displayValue.includes(".")) {
    // If they click decimal on an empty screen, make it "0."
    if (displayValue === "") {
      displayValue = "0";
    }
    displayValue += ".";
    display.textContent = displayValue;
  }
});

backspaceButton.addEventListener("click", () => {
  // If a result was just calculated, backspace shouldn't delete parts of the result
  if (shouldResetDisplay) return;

  // Remove the last character from displayValue
  displayValue = displayValue.slice(0, -1);

  // Update the display; if it becomes empty, show "0" or leave it blank
  if (displayValue === "") {
    display.textContent = "0";
  } else {
    display.textContent = displayValue;
  }
});

window.addEventListener("keydown", (e) => {
  // Numbers 0-9
  if (e.key >= "0" && e.key <= "9") {
    handleNumber(e.key);
  }
  
  // Decimal point
  if (e.key === ".") {
    handleDecimal();
  }
  
  // Operators (+, -, *, /)
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    handleOperator(e.key);
  }
  
  // Equals (Enter key or standard '=' key)
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault(); // Prevent default browser behavior for Enter
    handleEquals();
  }
  
  // Backspace key
  if (e.key === "Backspace") {
    handleBackspace();
  }
  
  // Escape key for Clear
  if (e.key === "Escape") {
    handleClear();
  }
});

function handleNumber(digit) {
  if (shouldResetDisplay) {
    displayValue = "";
    shouldResetDisplay = false;
  }
  displayValue += digit;
  display.textContent = displayValue;
}

function handleDecimal() {
  if (shouldResetDisplay) {
    displayValue = "0";
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
  shouldResetDisplay = false;
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

// Hook your DOM elements back up to these functions:
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