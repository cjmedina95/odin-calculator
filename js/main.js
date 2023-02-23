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
const addButton = document.querySelector("button#btnAdd");
const decimal = document.querySelector("button#btnDot");
const equalsButton = document.querySelector("button#btnEquals");
const numBtn = [];

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

function equals() {
    switch(signPressed) {
        case "+":
            currentEntry = (parseFloat(currentEntry) + previousEntry).toString();
            previousEntry = parseFloat(currentEntry);
            break;
        case "/":
            break;
        case "-":
            break;
        case "×":
            break;
        case "%":
            break;
        default:
            break;
    }

    signPressed = "0";
    renderText();
}

function addNumbers() {
    let entryToNumber = parseFloat(currentEntry);
    signPressed = "+";
    newEntryBool = true;

    if (entries.length > 1) {
        entries.shift();
        entries.push("+");
    }
    else {
        entries.push("+");
    }

    if(entries[0] === "+") {
        previousEntry = entryToNumber;
        return;
    }
    else {
        if (previousEntry != 0) {
            previousEntry += entryToNumber;
        } else {
            previousEntry = entryToNumber;
        }
    }

    currentEntry = previousEntry.toString();
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
addButton.addEventListener("click", addNumbers);
clearEntryButton.addEventListener("click", clearEntry);
clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", equals);

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