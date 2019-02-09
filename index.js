const word = require("./word")
const inquirer = require("inquirer");

let randWords = ["talked", "sea", "rice", "yearn", "zucchini"];
let currentWord = new word();

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
            currentWord.letters.map(x => x.compareChar(res.guess));
            currentWord.displayWord();
            requestGuess();
        })
        .catch(function (err) {
            throw err;
        })
}

createWord();
requestGuess();