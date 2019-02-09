const word = require("./word")
const inquirer = require("inquirer");

let randWords = ["talked", "sea", "rice", "yearn", "zucchini"];
let currentWord = new word();

const maxGuesses = 10;
let guessesLeft = maxGuesses;

function createWord() {
    let rand = randWords[Math.floor(Math.random() * randWords.length)];
    currentWord.splitLetters(rand);
    currentWord.displayWord();
}

function requestGuess() {
    inquirer.prompt([{
        name: "guess",
        message: "Guess a letter!",
        type: "input",
        validate: function (input) {
            if (typeof input === "string" && isNaN(input) && input.length === 1)
                return true;
            return false;
        }
    }])
        .then(function (res) {
            checkGuess(res.guess);
            currentWord.letters.map(x => x.compareChar(res.guess));
            currentWord.displayWord();
            if (checkForEndGame()) {
                console.log("You win!");
                //TODO and replay inquirer
            }
            else {
                requestGuess();
            }
        })
        .catch(function (err) {
            throw err;
        })
}

function checkGuess(input) {
    for (i = 0; i < currentWord.letters.length; i++) {
        if (currentWord.letters[i].char === input) {
            if (currentWord.letters[i].guessed === true) {
                console.log("You already guessed that one.");
            }
            else {
                console.log("Nice guess!");
            }
            return;
        }
    }
    console.log("Sorry that's wrong.");
}

function checkForEndGame() {
    for (i = 0; i < currentWord.letters.length; i++) {
        if (currentWord.letters[i].guessed === false)
            return false;
    }
    return true;
}

function startGame() {
    createWord();
    requestGuess();
}

startGame();
