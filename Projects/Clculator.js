// Get user input + calculation actions
const userInput = document.getElementById('input-number');
const addBtn = document.getElementById('btn-add');
const subtractBtn = document.getElementById('btn-subtract');
const multiplyBtn = document.getElementById('btn-multiply');
const divideBtn = document.getElementById('btn-divide');

// Get Result output + current result ouptput calculation
const currentResultOutput = document.getElementById('current-result');
const currentCalculationOutput = document.getElementById('current-calculation');

// Output result
function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}

// Fields
const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Calculation description
function createAndWriteOutput(initialResult, operator, enteredNumber) {
  const calculationDescription = `${initialResult} ${operator} ${enteredNumber}`;
  outputResult(currentResult, calculationDescription);
}

// Calculation history log
function writeToLog(operationIdentifier, number, initialResult, currentResult) {
  const logEntry = {
    operatortion: operationIdentifier,
    enteredNumber: number,
    prevResult: initialResult,
    result: currentResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(calculationType) {
  const enteredNumber = parseInt(userInput.value);
  const initialResult = currentResult;
  let mathOperator;

  if (calculationType === "DIVIDE" && enteredNumber == 0) {
    // Warning message
    console.warn("Cannot divide by 0");
    // Do nothing
    return;
  }

  if (calculationType === "ADD") {
    currentResult += enteredNumber;
    mathOperator = "+";
  } else if (calculationType === "SUBTRACT") {
    currentResult -= enteredNumber;
    mathOperator = "-";
  } else if (calculationType === "MULTIPLY") {
    currentResult *= enteredNumber;
    mathOperator = "*";
  } else if (calculationType === "DIVIDE") {
    currentResult /= enteredNumber;
    mathOperator = "/";
  } else {
    // Warning message
    console.warn(
      "calcutionType must be ['ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE']"
    );
    // Do nothing
    return;
  }

  createAndWriteOutput(initialResult, mathOperator, enteredNumber);
  writeToLog(calculationType, enteredNumber, initialResult, currentResult);
}

function add() {
  calculateResult("ADD");
}

function subtract() {
  calculateResult("SUBTRACT");
}

function multiply() {
  calculateResult("MULTIPLY");
}

function divide() {
  calculateResult("DIVIDE");
}

// EventListeners
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
