// === DEFINITIONS ===
// 
// ===================
// 
// === SUMMARY ===
//
// ===============

var equatedValue = 0;
var previousSign = "";
var currentValue = "0";
var newEntryFlag = true;

const deleteButton = document.querySelector("button#delete");
const clearEntryButton = document.querySelector("button#clearEntry");
const clearButton = document.querySelector("button#clear");
const percentButton = document.querySelector("button#btnPercent");
const addButton = document.querySelector("button#btnAdd");
const subtractButton = document.querySelector("button#btnSubtract");
const multiplyButton = document.querySelector("button#btnMultiply");
const divideButton = document.querySelector("button#btnDivide");
const logButton = document.querySelector("button#btnLog");
const rootButton = document.querySelector("button#btnRoot");
const squareButton = document.querySelector("button#btnSquare");
const decimal = document.querySelector("button#btnDot");
const equalsButton = document.querySelector("button#btnEquals");
const signButton = document.querySelector("button#btnSign");
const numBtn = [];
const digits = ['1','2','3','4','5','6','7','8','9','0'];

function renderText() {
    const answerText = document.querySelector("#answerFrame > p");
    answerText.innerText = currentValue;
}

function backspace() {
    currentValue = currentValue.slice(0, -1);
    if (currentValue.length === 0) {
        currentValue = "0";
    }
    renderText();
}

function clear() {
    equatedValue = 0;
    previousSign = "";
    currentValue = "0";
    newEntryFlag = true;
    renderText();
}

function calculateNumbers(sign) {

    // Prevent repeated sign presses from calculating new values.
    if (newEntryFlag) {
        previousSign = sign;
        return;
    }

    newEntryFlag = true;

    // Initialize previousSign only for the first sign press.
    if (previousSign === "") {
        equatedValue = parseFloat(currentValue);
        previousSign = sign;
        return;
    }

    switch(previousSign) {
        case "+":
            equatedValue += parseFloat(currentValue);
            break;
        case "-":
            equatedValue -= parseFloat(currentValue);
            break;
        case "×":
            equatedValue *= parseFloat(currentValue);
            break;
        case "÷":
            if (currentValue === "0") {
                clear();
                currentValue = "Oops!"
                renderText();
                return;
            }
            equatedValue /= parseFloat(currentValue);
            break;      
        default:
            break;
    }

    previousSign = sign;
    currentValue = equatedValue.toString();
    renderText();
}

function calculateLog() {
    currentValue = Math.log10(parseFloat(currentValue)).toString();
    renderText();
}

function calculateRoot() {
    currentValue = Math.sqrt(parseFloat(currentValue)).toString();
    renderText();
}

function calculateSquare() {
    currentValue = Math.pow(parseFloat(currentValue), 2).toString();
    renderText();
}

function clearEntry() {
    currentValue = "0";
    renderText();
}

function setDecimal() {
    newEntryFlag = false;
    if (!currentValue.includes(".")) {
        currentValue = currentValue.concat(".");
    }
    renderText();
}

function signChange() {
    if (currentValue.includes('-') === false) {
        currentValue = '-' + currentValue;
    }
    else {
        currentValue = currentValue.substring(1, currentValue.length);
    }

    renderText();
}

for (let i = 0; i < 10; i++) {
    numBtn.push(document.querySelector("button#btn" + i));
}

numBtn.forEach((number) => {
    number.addEventListener("click", function(){
        if (currentValue.length > 16) {
            return;
        }
        else {
            let input = number.innerText;

            if (currentValue === "0" || newEntryFlag) {
                currentValue = input;
                newEntryFlag = false;
            }
            else {
                currentValue = currentValue.concat(input);
            }
            renderText();
        }
    });
});

decimal.addEventListener("click", setDecimal);
deleteButton.addEventListener("click", backspace);
percentButton.addEventListener("click", function() {
    currentValue *= 0.01;
    renderText();
});
addButton.addEventListener("click", function() { calculateNumbers("+"); });
subtractButton.addEventListener("click", function() { calculateNumbers("-"); });
multiplyButton.addEventListener("click", function() { calculateNumbers("×"); });
divideButton.addEventListener("click", function() { calculateNumbers("÷"); });
logButton.addEventListener("click", calculateLog);
rootButton.addEventListener("click", calculateRoot);
squareButton.addEventListener("click", calculateSquare);
clearEntryButton.addEventListener("click", clearEntry);
clearButton.addEventListener("click", clear);
signButton.addEventListener("click", signChange);
equalsButton.addEventListener("click", function() { 
    newEntryFlag = false;
    calculateNumbers(previousSign); 
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) {
        return;
    }
    const key = e.key;
    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (currentValue.length > 16) {
                return;
            }

            if (currentValue === "0" || newEntryFlag) {
                currentValue = key;
                newEntryFlag = false;
            }
            else {
                currentValue = currentValue.concat(key);
            }

            break;
        case 'Backspace':
            if (currentValue.length > 16) {
                return;
            }
            backspace();
            break;
        case '.':
            setDecimal();
            break;
        default:
            break;
    }

    renderText();
});