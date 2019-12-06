const cards = [
    { id: 1, image: 'img/bersa.png' },
    { id: 2, image: 'img/herbarium.png' },
    { id: 3, image: 'img/notturno.png' },
    { id: 4, image: 'img/randigbanan.png' },
    { id: 5, image: 'img/rasymatto.png' },
    { id: 6, image: 'img/siirtolapuutarha.png' },
    { id: 7, image: 'img/unikko.png' },
    { id: 8, image: 'img/vegetabletree.png' }
];

// Duplicate cards array
const duplicateCards = [...cards, ...cards];
let openedCards = [];

const memoryContainer = document.querySelector(".memory-container");
const memoryGame = document.querySelector(".memory-game");
const startScreen = document.querySelector(".start-screen");
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".start-over");
const clickCounter = document.querySelector(".click-counter");
const timer = document.getElementById("timer");

let seconds = 0;
let tenthSeconds =  0;
let count = 0;
let isFlipped = false;
let lockGame = false;
let firstCard, secondCard;
let playing = false;


function countTimer() {

    if (playing) { 
    tenthSeconds++

        if (tenthSeconds/10 === 1){
            seconds++;
            tenthSeconds = 0;
        }
        timer.innerHTML = seconds + "." + tenthSeconds;
    }
}

// Function that flips the cards
function flipCard() {
    playing = true;
    if (lockGame) return;
    if (this === firstCard) return; 

    this.classList.toggle('flip');

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
        if(firstCard.dataset.id === secondCard.dataset.id) {
            disableCards();

        } else {
            unflipCards();
        }
}

 // If there's a match remove click-function
function disableCards() {
     firstCard.removeEventListener('click', flipCard);
     secondCard.removeEventListener('click', flipCard);

     countCards();
     resetGame();
}

 // If there's no match, remove 'flip'
function unflipCards() {
    lockGame = true; 

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetGame();

    }, 1500);
}

function resetGame() {
    isFlipped = false;
    lockGame = false;
    firstCard = null;
    secondCard = null;
}


function countCards() {
    openedCards.push(firstCard, secondCard);

    if (openedCards.length === 16) {

        playing = false; 
       
        setTimeout(() => {
            window.alert(`YAY you won! Time: ${seconds}.${tenthSeconds}, Moves: ${count}`);
        }, 1000)
    }

}


const stringToHTML = str => {
    const div = document.createElement("div");
    div.innerHTML = str;
        return div.firstChild;
};

const createCard = (id, image) => {
    return `<div class="memory-card" data-id=${id}>
                <img class="front" src=${image} alt="">
                <img class="back" src="" alt="">
            </div>`;
};

const generateCards = () => {
    duplicateCards.forEach(card => {
        const element = createCard(card.id, card.image);
        memoryGame.appendChild(stringToHTML(element));
        
    });
};



// const listItems = [
//     { name: 'Marimekko', title: 'Unikko' },
//     { name: 'Stig Lindberg', title: 'hej' },
//     { name: 'Inez Svensson', title: 'hellooo' },
//     { name: 'Josef Frank', title: 'tjena' },
// ];
// const ulList = document.querySelector(".list");


// const createList = (name, title) => {
//     return `<li>${name}, by ${title}</li>`;
// };

// const generateList = () => {
//     listItems.forEach(listItem => {
//         const item = createList(listItem.name, listItem.title);
//         ulList.appendChild(stringToHTML(item));

//         console.log(item)
//     });
// };


// Shuffles array
const shuffle = array => {
    let counter = array.length, temp, index;

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
const countMoves = () => {

    if (lockGame === true){
        return;
    }
    count += 1;
    clickCounter.innerHTML = count;
};

const start = () => {
    shuffle(duplicateCards);
    generateCards();
    // generateList();
    memoryGame.addEventListener('click', countMoves);
    const memoryCards = document.querySelectorAll(".memory-card");
    
    memoryCards.forEach(memoryCard => {
        memoryCard.addEventListener("click", flipCard);
    });

}

start();

const startGame = () => {
    startScreen.classList.add('fadeOut');
    memoryContainer.classList.remove('blur');
    setInterval(countTimer, 100);
}

const startOver = () => {
    shuffle(duplicateCards);
    
}

startButton.addEventListener('click', startGame);

restartButton.addEventListener('click', startOver);
