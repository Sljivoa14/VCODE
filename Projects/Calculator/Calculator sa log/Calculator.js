const addBtn = document.getElementById("btn-add");
const subtractBtn = document.getElementById("btn-subtract");
const multiplyBtn = document.getElementById("btn-multiply");
const divideBtn = document.getElementById("btn-divide");
const logBtn = document.getElementById("btn-log");
const userInput = document.getElementById("input-number");
const currentResultOutput = document.getElementById("current-result");
const currentCalculationOutput = document.getElementById("current-calculation");
const deleteBtn = document.getElementById("btn-clear");

defaultResult = 0;
let currentResult = defaultResult ;

let logEntries = [];


//log 
function writeLog(operationName, prevResult, userNumber, newResult) {
  const logEntry = {
    operation: operationName,
    prevResult,
    userNumber,
    newResult
  };
  logEntries.push(logEntry);
  
}

function createAndWriteOutput(initialResult, operator, enteredNumber){
    const  calculationDescription = `${initialResult} ${operator} ${enteredNumber}`;
    outputResult(currentResult, calculationDescription);
}

function outputResult(result, text) {
    currentResultOutput.textContent = result;
    currentCalculationOutput.textContent = text;
}
/*

if (calculationType === "ADD") {
    currentResult = currentResult + enteredNumber;
    mathOperator = "+";
}
else if (calculationType === "SUBTRACT") {
    currentResult = currentResult - enteredNumber;
    mathOperator = "-";                                        nisam ubacio if u funkciju
}   
else if (calculationType === "MULTIPLY") {
    currentResult = currentResult * enteredNumber;
    mathOperator = "*";
}
else if (calculationType === "DIVIDE") {
    currentResult = currentResult / enteredNumber;
    mathOperator = "/";
}
createAndWriteOutput(initialResult, mathOperator, enteredNumber);
writeLog(calculationType, enteredNumber, initialResult, currentResult);*/



function calculateResult(calculationType) {
  const enteredNumber = parseFloat(userInput.value);// ubacio if u f unkciju
  const initialResult = currentResult;
  let mathOperator;

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
    currentResult /= enteredNumber; //
    mathOperator = "/";
  }

  if (calculationType ==="DIVIDE"&& enteredNumber ==0){
    alert("Cannot divide by 0 beacuse it will say in");
    return;
  } 


  createAndWriteOutput(initialResult, mathOperator, enteredNumber);
  writeLog(calculationType, initialResult, enteredNumber, currentResult);
}



addBtn.addEventListener("click", function() {
    calculateResult("ADD");
});

subtractBtn.addEventListener("click", function() {
    calculateResult("SUBTRACT");
}); 

multiplyBtn.addEventListener("click", function() {
    calculateResult("MULTIPLY");
}); 

divideBtn.addEventListener("click", function() {
    calculateResult("DIVIDE");
});

logBtn.addEventListener("click", function() {
    console.log(logEntries);
});


// delete/restart

function clearCalculator() {
  currentResult = 0;
  userInput.value = '';
  outputResult(currentResult, ''); 

}

deleteBtn.addEventListener("click", clearCalculator);



    