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

let firstNumber = null;
let operator = null;
let secondNumber = null;

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

// Track the current display value text
let displayValue = "";

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the number value from the data attribute or text content
    const digit = button.getAttribute("data-number");
    
    // Append the digit to displayValue (or handle first number input)
    displayValue += digit;
    
    // Update the HTML display element
    display.textContent = displayValue;
    
    // Update your number variables depending on whether an operator is chosen yet
    if (operator === null) {
      firstNumber = displayValue;
    } else {
      secondNumber = displayValue;
    }
  });
});