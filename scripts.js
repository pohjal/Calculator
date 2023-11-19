const numerals = document.querySelectorAll(".inputValue");
const display = document.querySelector("#input");
const allClearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const operatorButton = document.querySelector("#operate");

numerals.forEach((number) => {
  number.addEventListener("click", function () {
    addToDisplay(number.value);
  });
});
operatorButton.addEventListener("click", operate);
allClearButton.addEventListener("click", allClear);
deleteButton.addEventListener("click", deleteInput);
// input display functionalities

function addToDisplay(number) {
  display.textContent += number;
}
function deleteInput() {
  display.textContent = display.textContent.slice(0, -1);
}

function allClear() {
  display.textContent = "";
}

//  calculator functionalitie

function operate() {
  const inputString = display.textContent;

  // Check if the input ends with "!" and extract the number before "!"
  const factorialRegex = /([-]?\d*\.?\d+(?:[eE][-+]?\d+)?)\s*!$/;
  const factorialMatch = inputString.match(factorialRegex);

  if (factorialMatch) {
    const [, num] = factorialMatch;
    const result = factorial(parseFloat(num));
    display.textContent = result;
    return;
  }

  // The rest of your existing code for other operations
  const regex =
    /([-]?\d*\.?\d+(?:[eE][-+]?\d+)?)\s*([-+*/%!])\s*([-]?\d*\.?\d+(?:[eE][-+]?\d+)?)/;
  const match = inputString.match(regex);

  if (!match) {
    display.textContent = "Error";
    return;
  }

  const [fullMatch, operand1, operator, operand2] = match;
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  let result;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      if (num2 !== 0) {
        result = divide(num1, num2);
      } else {
        display.textContent = "Error";
        return;
      }
      break;
    case "%":
      result = modulo(num1, num2); // Use the modulo function
      break;
    case "!":
      result = calculateFactorial(num1);
      break;
    default:
      display.textContent = "Error";
      return;
  }

  display.textContent = result;
}

function factorial(number) {
  if (number < 0) {
    return "Error";
  }

  if (number === 0 || number === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= number; i++) {
    result *= i;
  }

  return result;
}

function modulo(aNumber, bNumber) {
  return aNumber % bNumber;
}

function add(aNumber, bNumber) {
  return aNumber + bNumber;
}

function subtract(aNumber, bNumber) {
  return aNumber - bNumber;
}

function multiply(aNumber, bNumber) {
  return aNumber * bNumber;
}

function divide(aNumber, bNumber) {
  return aNumber / bNumber;
}
