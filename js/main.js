var currentEntry = [0.3];

const deleteButton = document.querySelector("button#delete");
const clearEntryButton = document.querySelector("button#clearEntry");

function renderText() {
    const answerText = document.querySelector("#answerFrame > p");
    answerText.innerText = currentEntry.join("");
}

function backspace() {
    currentEntry.pop();
    if (currentEntry.length === 0) {
        currentEntry.push(0);
    }
    renderText();
}

function clearEntry() {
    currentEntry = [0];
    renderText();
}

deleteButton.addEventListener("click", backspace);
clearEntryButton.addEventListener("click", clearEntry);
renderText();