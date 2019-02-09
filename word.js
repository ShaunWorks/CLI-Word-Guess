const letter = require("./letter.js");

module.exports = function () {
    this.letters = [];
    this.splitLetters = function (word) {
        arr = word.split("");
        arr.forEach(x => {
            this.letters.push(new letter(x, false));
        });
    }
    this.displayWord = function () {
        let arr = this.letters.map(y => y.returnLetter())
        console.log( arr.join(" "));
    }
}