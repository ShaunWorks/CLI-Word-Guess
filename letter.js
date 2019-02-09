module.exports = function (char, guessed) {
    this.char = char;
    this.guessed = guessed;
    this.returnLetter = function () {
        if (this.guessed === true) 
            return char;
        return "_";
    };
    this.compareChar = function (guessedChar) {
        if (guessedChar === char) {
            this.guessed = true;
        }
    };
}