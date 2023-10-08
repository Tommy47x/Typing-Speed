const inputWord = document.getElementById("inputWord");
inputWord.disabled = true; // Disable input until game starts
let spacebarListener = null; // Declare the event listener variable outside the function
//Also this variable is used to remove the event listener when the game ends, so it doesn't keep listening for the spacebar

//write a function that will start the game when the user clicks the start button 

// Variables for the game
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let timer;
let currentWord = "";
let typedWord = "";

// Function that starts the game when the user clicks the start button
function startGame() {
    displayTime(); // Display the timer
    inputWord.disabled = false; // Enable input
    textArray = generateRandomTextArray(); // Generate the random array
    displayText(); //Display the word
    addKeyDownEventListener(); // Add event listener for the spacebar
}

function enableNightMode() { // Function that enables night mode (dark theme)
    const body = document.body;
    body.style.backgroundColor = "#222";
    body.style.color = "gray";
    //All elements except the margins of the alert container will have the same background color and text color
    const elements = document.querySelectorAll('body *:not(.alert-container)');
    for (let i = 0; i < elements.length; ++i) {
        const inPageElements = elements[i];
        inPageElements.style.backgroundColor = "#222";
        inPageElements.style.color = "gray";
    }
}

function displayTime() { // Function that displays the timer
    let time = 59;
    timer = setInterval(function () {
        if (time === 0) {
            endGame(); // End the game when the timer reaches 0
        }
        document.getElementById("timeLeft").textContent = `Time: ${time}`;  // Display the time left in the game
        --time;
    }, 1000);
}

// Function that adds the event listener for the keydown event (SPACE)
function addKeyDownEventListener() {
    spacebarListener = document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            checkWord();
        }
    });
}

// Function that generates the random array
function generateRandomTextArray() {
    const words = ["algorithm", "array", "boolean", "class", "compiler", "constant", "database", "debugging", "function", "inheritance", "interface", "iteration", "javascript", "library", "loop", "method", "object", "operator", "parameter", "recursion", "variable", "webpage", "abstraction", "agile", "api", "architecture", "assembly", "backend", "binary", "bug", "bytecode", "cache", "char", "client", "cloud", "code", "command", "compile", "console", "cookie", "css", "data", "debug", "declare", "deploy", "design", "devops", "directive", "dns", "dom", "dynamic", "element", "encryption", "error", "event", "exception", "expression", "file", "firewall", "framework", "frontend", "git", "gui", "hash", "html", "http", "https", "ide", "immutable", "inherit", "instance", "int", "interface", "interpreter", "java", "json", "kernel", "library", "linker", "linux", "load", "local", "logic", "loop", "machine", "macro", "memory", "metadata", "middleware", "module", "multithreading", "network", "null", "object-oriented", "opcode", "optimization", "os", "package", "parameter", "parse", "performance", "php", "port", "process", "program", "protocol", "query", "queue", "ram", "react", "recursion", "regex", "repository", "request", "response", "rest", "router", "runtime", "sass", "script", "sdk", "security", "server", "session", "socket", "source", "sql", "stack", "static", "storage", "string", "syntax", "tag", "template", "testing", "thread", "token", "tree", "type", "unicode", "unix", "url", "variable", "version", "virtual", "web", "websocket", "windows", "xml", "yaml"];
    const textArray = [];
    for (let i = 0; i < words.length; ++i) {
        const randomWordIndex = Math.floor(Math.random() * words.length);
        const word = words[randomWordIndex] // Convert word to lowercase
        words.splice(randomWordIndex, 1); // Remove word from array so it doesn't repeat
        textArray.push(word); // Add word to array of words to be displayed in the game
    }
    return textArray;
}

let gameEnded = false;
const textContainer = document.getElementById("textContainer");
// Function that displays the actual word
function displayText() {
    if (currentIndex < textArray.length) {
        currentWord = textArray[currentIndex];
        textContainer.textContent = currentWord;
    }
}

// Function that checks the relation Input - Actual Word
function checkWord() {
    if (gameEnded) return;
    typedWord = inputWord.value.trim();

    if (checkMatch(typedWord, currentWord)) {
        textContainer.style.color = "lime";
        ++correctCount; // WPM 
    } else if (typedWord === "") {
        return; // If the user doesn't type anything, don't count it as an error
    } else {
        const errorSound = document.getElementById("sound-effect");
        errorSound.play(); // Play the error sound
        textContainer.style.color = "red";
        ++incorrectCount;
    }

    inputWord.value = ""; // Deletes input
    ++currentIndex; // Next word
    displayText();
}

function checkMatch(typedWord, currentWord) { // Function that checks if the typed word matches the actual word
    return typedWord === currentWord;
}

// Function for ending the game
function endGame() {
    clearInterval(timer); // Stops the timer
    textContainer.innerHTML = `Game Over!
   <br>
    <button class="btn btn-primary" id="restartButton"onClick ="location.reload()">Restart</button>`
    // Display the results
    document.getElementById("successMessage").textContent = `Correct: ${correctCount}`;
    document.getElementById("errorMessage").textContent = `Incorrect: ${incorrectCount}`;
    inputWord.textContent = ""; // Delete input
    inputWord.disabled = true; // Disable input
    document.removeEventListener("keydown", spacebarListener); // Remove event listener for spacebar
    gameEnded = true;
}