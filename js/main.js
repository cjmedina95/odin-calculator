// === DEFINITIONS ===
// entries[] holds the two most recent inputs to check for repeated operator presses
// newEntryBool is a flag to reset the input when an operator is pressed
// currentEntry is the number currently in the text box
// previousEntry is the number previously in the text box (e.g. before an operator was pressed)
// ===================
// 
// === SUMMARY ===
var currentEntry = "0";
var previousEntry = 0;
var signPressed = "0";
var newEntryBool = false;
var entries = [];

const deleteButton = document.querySelector("button#delete");
const clearEntryButton = document.querySelector("button#clearEntry");
const clearButton = document.querySelector("button#clear");
const percentButton = document.querySelector("button#btnPercent");
const addButton = document.querySelector("button#btnAdd");
const subtractButton = document.querySelector("button#btnSubtract");
const multiplyButton = document.querySelector("button#btnMultiply");
const divideButton = document.querySelector("button#btnDivide");
const decimal = document.querySelector("button#btnDot");
const equalsButton = document.querySelector("button#btnEquals");
const numBtn = [];
const digits = ['1','2','3','4','5','6','7','8','9','0'];

function renderText() {
    const answerText = document.querySelector("#answerFrame > p");
    answerText.innerText = currentEntry;
}

function backspace() {
    currentEntry = currentEntry.slice(0, -1);
    if (currentEntry.length === 0) {
        currentEntry = "0";
    }
    renderText();
}

function clear() {
    previousEntry = 0;
    currentEntry = "0";
    signPressed = "0";
    newEntryBool = false;
    entries = [];
    renderText();
}

function calculateNumbers(sign) {
    let entryToNumber = parseFloat(currentEntry);

    if (sign !== "=") {
        signPressed = sign;
    }

    newEntryBool = true;

    if (entries.length > 1) {
        entries.shift();
        entries.push(signPressed);
    }
    else {
        entries.push(signPressed);
    }

    if(entries[0] === signPressed) {
        previousEntry = entryToNumber;
        return;
    }
    else if(!digits.includes(entries[0])) {
        return;
    }
    else {
        if (previousEntry != 0 || signPressed === "%") {
            switch(signPressed) {
                case "+":
                    currentEntry = (previousEntry + entryToNumber).toString();
                    previousEntry = entryToNumber;
                    break;
                case "÷":
                    currentEntry = (previousEntry / entryToNumber).toString();
                    previousEntry = entryToNumber;
                    break;
                case "-":
                    currentEntry = (previousEntry - entryToNumber).toString();
                    previousEntry = entryToNumber;
                    break;
                case "×":
                    currentEntry = (previousEntry * entryToNumber).toString();
                    previousEntry = entryToNumber;
                    break;
                case "%":
                    currentEntry = (entryToNumber * 0.01).toString();
                    previousEntry = entryToNumber;
                    console.log(currentEntry);
                    break;
                case "=":
                    calculateNumbers(signPressed);
                    //signPressed = "0";
                    break;
                default:
                    break;
            }
        } else {
            previousEntry = entryToNumber;
        }

    }

    //currentEntry = previousEntry.toString();
    renderText();
}

function clearEntry() {
    currentEntry = "0";
    renderText();
}

function setDecimal() {
    if (!currentEntry.includes(".")) {
        currentEntry = currentEntry.concat(".");
    }
    renderText();
}

for (let i = 0; i < 10; i++) {
    numBtn.push(document.querySelector("button#btn" + i));
}

numBtn.forEach((number) => {
    number.addEventListener("click", function(){
        let input = number.innerText;
        if (currentEntry === "0" || newEntryBool == true) {
            currentEntry = input;
            newEntryBool = false;
        }
        else {
            currentEntry = currentEntry.concat(input);
        }
        entries.shift();
        entries.push(input);
        console.log(entries);
        renderText();
    });
});

decimal.addEventListener("click", setDecimal);
deleteButton.addEventListener("click", backspace);
percentButton.addEventListener("click", function() { calculateNumbers("%"); });
addButton.addEventListener("click", function() { calculateNumbers("+"); });
subtractButton.addEventListener("click", function() { calculateNumbers("-"); });
multiplyButton.addEventListener("click", function() { calculateNumbers("×"); });
divideButton.addEventListener("click", function() { calculateNumbers("÷"); });
clearEntryButton.addEventListener("click", clearEntry);
clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", function() { calculateNumbers("="); });

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;

    const key = e.key;
    console.log(key);
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
            if (currentEntry === "0") {
                currentEntry = key;
            }
            else {
                currentEntry = currentEntry.concat(key);
            }
            break;
        case 'Backspace':
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