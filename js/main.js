var currentEntry = "0";

const deleteButton = document.querySelector("button#delete");
const clearEntryButton = document.querySelector("button#clearEntry");
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

function clearEntry() {
    currentEntry = "0";
    renderText();
}

for (let i = 0; i < 10; i++) {
    numBtn.push(document.querySelector("button#btn" + i));
}

numBtn.forEach((number) => {
    number.addEventListener("click", function(){
        if (currentEntry === "0") {
            currentEntry = number.innerText;
        }
        else {
            currentEntry = currentEntry.concat(number.innerText);
        }
        renderText();
    });
});

deleteButton.addEventListener("click", backspace);
clearEntryButton.addEventListener("click", clearEntry);
