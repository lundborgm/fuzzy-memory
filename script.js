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

//duplicate cards array
const duplicateCards = [...cards, ...cards];

const memoryGame = document.querySelector(".memory-game");




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

        console.log(element);
        
    });
};




// Function that shuffles the cards array
function shuffle(array) {
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


const start = () => {
    shuffle(duplicateCards);
    generateCards();
    const elements = document.querySelectorAll(".memory-cards");
}


start();