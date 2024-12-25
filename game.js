
const cardValues = [1, 2, 3, 4, 5, 6, 7, 8];
let shuffledCards = [];
let flippedCards = [];
let matchedPairs = 0;


const cardContainer = document.getElementById('card-container');
const restartButton = document.getElementById('restart-btn');


function shuffleCards() {
    shuffledCards = [...cardValues, ...cardValues];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[randomIndex]] = [shuffledCards[randomIndex], shuffledCards[i]];
    }
}


function createCards() {
    shuffledCards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;//<div class="card" data-value="1"></div>
        card.addEventListener('click', flipCard);
        cardContainer.appendChild(card);
    });
}


function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}


function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardValues.length) {
            setTimeout(() => alert('You win!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 800);
    }
}


function restartGame() {
    cardContainer.innerHTML = ''; 
    shuffledCards = [];
    flippedCards = [];
    matchedPairs = 0;
    shuffleCards();
    createCards();
}


shuffleCards();
createCards();


restartButton.addEventListener('click', restartGame);
