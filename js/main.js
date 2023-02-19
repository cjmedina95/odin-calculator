var currentEntry = "0";

const deleteButton = document.querySelector("button#delete");
const clearEntryButton = document.querySelector("button#clearEntry");
const numBtn = [];
const decimal = document.querySelector("button#btnDot");

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
        if (currentEntry === "0") {
            currentEntry = input;
        }
        else {
            currentEntry = currentEntry.concat(input);
        }
        renderText();
    });
});

decimal.addEventListener("click", setDecimal);
deleteButton.addEventListener("click", backspace);
clearEntryButton.addEventListener("click", clearEntry);

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
        default:
            console.log("wtf");
    }

    renderText();
});