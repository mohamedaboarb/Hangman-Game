const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
let category = document.querySelector(".category span");
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});
const words = {
  Egypt: ["ahly", "zamalek", "ismaily", "Wadi degla", "enppi"],
  Spain: ["real madrid", "barcelona", "real betis", "girona", "sevilla"],
  England: [
    "liverpool",
    "munchester city",
    "munchester united",
    "leicster city",
    "newcastle",
  ],
  France: ["psg", "marseille", "lyon", "angers", "nice"],
};
let Allkeys = Object.keys(words);
let randomNumber = Math.floor(Math.random() * Allkeys.length);
let randomLeague = Allkeys[randomNumber];
let randomTeamList = words[randomLeague];
let randomTeamNumber = Math.floor(Math.random() * randomTeamList.length);
let randomTeam = randomTeamList[randomTeamNumber];
category.innerHTML = randomLeague;
// select letters guess
let lettersGuesscontainer = document.querySelector(".letters-guess");
let wordArray = Array.from(randomTeam);
// create spans depend on the random team
wordArray.forEach((word) => {
  let emptySpan = document.createElement("span");
  if (word === " ") {
    emptySpan.className = "with-space";
  }
  lettersGuesscontainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

// handle clicking on letters
document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // get clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    wordArray.forEach((wordLetter, wordIndex) => {
      if (clickedLetter == wordLetter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finish");
      }
    } else {
      document.getElementById("success").play();
    }
  }
});
function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Game Over, The Word is ${randomTeam}`);
  div.appendChild(divText);
  div.className = "message";
  document.body.appendChild(div);
}
