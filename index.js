const word = require("./word")
const inquirer = require("inquirer");

let randWords = ["artichoke", "broccoli", "carrot", "dragonfruit", "eggplant", "fig", "garlic", "horseradish", "kale", "lemon", "mango", "onion", "pumpkin", "raspberry", "spinach", "tomato", "watermelon", "yam", "zucchini"];
let currentWord = new word();

const maxGuesses = 10;
let guessesLeft = maxGuesses;

function createWord() {
    let rand = randWords[Math.floor(Math.random() * randWords.length)];
    currentWord.letters = [];
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
                inquirer.prompt([{
                    name: "choice",
                    message: "Play again?",
                    type: "confirm"
                }])
                .then(function(res) {
                    if(res.choice) {
                        startGame();
                    }
                })
                .catch(function (err) {
                    throw err;
                })
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
    guessesLeft--;
    console.log("Sorry that's wrong.");
    console.log(`You have ${guessesLeft} guesses left.`)
}

function checkForEndGame() {
    if (guessesLeft <= 0) {
        console.log("Better luck next time...");
        currentWord.letters.forEach(x => {
            x.guessed = true;
        })
        currentWord.displayWord();
        return true;
    }
    for (i = 0; i < currentWord.letters.length; i++) {
        if (currentWord.letters[i].guessed === false)
            return false;
    }
    console.log("You win!");
    return true;
}

function startGame() {
    console.log("Fruit & Veggie Word Guess!");
    guessesLeft = maxGuesses;
    createWord();
    requestGuess();
}

startGame();
