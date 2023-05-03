"use strict";

// SELECTING ELEMENTS
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const getDice = document.querySelector(".dice-1");
const gameFolder = document.querySelector(".game");
const rollFolder = document.querySelector(".dice");
const holdFolder = document.querySelector(".hold");
const current0EL = document.querySelector("#current--0");
const current1EL = document.querySelector("#current--1");
const getPlayer0 = document.querySelector(".player-0");
const getPlayer1 = document.querySelector(".player-1");

// Starting conditions
let scores, currentScore, activePlayer, playing;

const initialize = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  getDice.classList.add("hidden");

  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove("player-winner");
  document.querySelector(`.user--${activePlayer}`).classList.remove("color");
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  getPlayer0.classList.add("player-active");
  getPlayer1.classList.remove("player-active");
};
initialize();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  getPlayer0.classList.toggle("player-active");
  getPlayer1.classList.toggle("player-active");
};

// Rolling dice functionality
rollFolder.addEventListener("click", function () {
  if (playing) {
    // 1. generate a random dice roll
    const rollDice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    getDice.classList.remove("hidden");
    getDice.src = `PNGs/dice ${rollDice}.png`;
    // 3. Check for rolled 1; if true, switch to nect player
    if (rollDice !== 1) {
      // add dice to the current score
      currentScore += rollDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      // getPlayer0.classList.remove("player-active");
      // getPlayer1.classList.add("player-active");
      switchPlayer();
    }
  }
});

holdFolder.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if players's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      getDice.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-active");
      document.querySelector(`.user--${activePlayer}`).classList.add("color");
    } else {
      switchPlayer();
    }
  }
});

gameFolder.addEventListener("click", initialize);
