const cards = [
  { id: 1, image: "img/bersa.png" },
  { id: 2, image: "img/herbarium.png" },
  { id: 3, image: "img/notturno.png" },
  { id: 4, image: "img/randigbanan.png" },
  { id: 5, image: "img/rasymatto.png" },
  { id: 6, image: "img/siirtolapuutarha.png" },
  { id: 7, image: "img/unikko.png" },
  { id: 8, image: "img/vegetabletree.png" }
];

// Duplicate cards array
const duplicateCards = [...cards, ...cards];

const memoryContainer = document.querySelector(".memory-container");
const memoryGame = document.querySelector(".memory-game");
const startScreen = document.querySelector(".start-screen");
const startButton = document.querySelector(".start-button");
const score = document.querySelector(".score");
const scoreBoard = document.querySelector(".score-board");
const completeMoves = document.querySelector(".complete-moves");
const completeTime = document.querySelector(".complete-time");
const playAgain = document.querySelector(".play-again");
const clickCounter = document.querySelector(".click-counter");
const timer = document.querySelector(".timer");

let flippedCards = [];
let seconds = 0;
let tenthSeconds = 0;
let moves = 0;
let isFlipped = false;
let lockGame = false;
let firstCard, secondCard;
let playing = false;

function countTimer() {
  if (playing) {
    tenthSeconds++;

    if (tenthSeconds / 10 === 1) {
      seconds++;
      tenthSeconds = 0;
    }
    timer.innerHTML = seconds + "." + tenthSeconds;
  }
}

setInterval(countTimer, 100);

// Function that flips the cards
function flipCard() {
  playing = true;
  if (lockGame) return;
  if (this === firstCard) return;

  this.classList.toggle("flip");

  if (!isFlipped) {
    // First click

    isFlipped = true;
    firstCard = this;
  } else {
    // Second click

    secondCard = this;

    checkPair();
  }
}

// Check if cards id match
function checkPair() {
  if (firstCard.dataset.id === secondCard.dataset.id) {
    disableCards();
  } else {
    unflipCards();
  }
}

// If there's a match remove click function
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  countCards();
  resetGame();
}

// If there's no match, remove 'flip'
function unflipCards() {
  lockGame = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetGame();
  }, 1200);
}

function resetGame() {
  isFlipped = false;
  lockGame = false;
  firstCard = null;
  secondCard = null;
}

function countCards() {
  flippedCards.push(firstCard, secondCard);

  if (flippedCards.length === 16) {
    playing = false;

    setTimeout(() => {
      score.classList.add("fadeIn");
      memoryContainer.classList.add("blur");
      completeTime.innerHTML = seconds + "." + tenthSeconds;
      completeMoves.innerHTML = moves;
    }, 1000);
  }
}

function createCard(id, image) {
  return `<div class="memory-card" data-id=${id}>
                <img class="front" src=${image} alt="">
                <img class="back" src="" alt="">
            </div>`;
}

function generateCards() {
  duplicateCards.forEach(card => {
    const element = createCard(card.id, card.image);
    memoryGame.innerHTML += element;
  });
}

// Shuffles array
function shuffle(array) {
  let counter = array.length,
    temp,
    index;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// Click-counter function
function countMoves() {
  if (lockGame === true) {
    return;
  }
  moves += 1;
  clickCounter.innerHTML = moves;
}

function start() {
  shuffle(duplicateCards);
  generateCards();
  memoryGame.addEventListener("click", countMoves);
  const memoryCards = document.querySelectorAll(".memory-card");

  memoryCards.forEach(memoryCard => {
    memoryCard.addEventListener("click", flipCard);
  });
}

start();

function startGame() {
  startScreen.classList.add("fadeOut");
  memoryContainer.classList.remove("blur");
}

startButton.addEventListener("click", startGame);

// Clear the memory board and sets values to 0
function clearBoard() {
  memoryGame.innerHTML = "";
  clickCounter.innerHTML = "0";
  timer.innerHTML = "0.0";
  seconds = 0;
  tenthSeconds = 0;
  moves = 0;
  flippedCards = [];
  score.classList.remove("fadeIn");
  score.classList.add("fadeOut");
  memoryContainer.classList.remove("blur");
}

// Play again when game is finished
playAgain.addEventListener("click", () => {
  clearBoard();
  start();
});
