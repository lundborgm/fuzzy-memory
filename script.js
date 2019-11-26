const cards = [
    { color: "#e3a8f5", text: "hej" },
    { color: "#f5a8c2", text: "hejhej" },
    { color: "#91dbbc", text: "tja" },
    { color: "#dadb91", text: "hola" },
    { color: "#91abdb", text: "hallååå" },
    { color: "#dbb291", text: "tjena" },
    { color: "#a6db8d", text: "ciao" },
    { color: "#ce7a7a", text: "hejsan" }
];

const game = document.querySelector(".memory-container");


const stringToHTML = str => {
    const div = document.createElement("div");
    div.innerHTML = str;
        return div.firstChild;
};

const createCard = (color, text) => {
    return `<div class="memory__cards" data-color=${color} style="background-color:${color}">
        <p>${text}</p>
        </div>`;
};
  

const generateCards = () => {
    cards.forEach(card => {
        const element = createCard(card.color, card.text);
        game.appendChild(stringToHTML(element));

        console.log(card);
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


const init = () => {
    shuffle(cards);
    generateCards();
    const elements = document.querySelectorAll(".memory__cards");

}


init();