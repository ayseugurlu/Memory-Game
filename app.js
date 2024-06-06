const cardArray = [
  { name: "araba", img: "img/araba.jpg" },
  { name: "balon", img: "img/balon.jpg" },
  { name: "gemi", img: "img/gemi.jpg" },
  { name: "kepce", img: "img/kepce.jpg" },
  { name: "roket", img: "img/roket.jpg" },
  { name: "ucak", img: "img/ucak.jpg" },
  { name: "araba", img: "img/araba.jpg" },
  { name: "balon", img: "img/balon.jpg" },
  { name: "gemi", img: "img/gemi.jpg" },
  { name: "kepce", img: "img/kepce.jpg" },
  { name: "roket", img: "img/roket.jpg" },
  { name: "ucak", img: "img/ucak.jpg" },
];

let gridDisplay = document.querySelector("#grid");
let score = document.getElementById("score");
let timerDisplay = document.getElementById("timer");
let confetti = document.getElementById("confetti");
let playAgainButton = document.getElementById("play-again");
let cardChosen = [];
let cardChosenID = [];
let cardsWon = [];
let secondsElapsed = 0;
let timer;

function startTimer() {
  timer = setInterval(() => {
    secondsElapsed++;
    timerDisplay.textContent = `Time: ${secondsElapsed}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function createBoard() {
  gridDisplay.innerHTML = ""; // Temizle
  cardArray.sort(() => 0.5 - Math.random());
  cardChosen = [];
  cardChosenID = [];
  cardsWon = [];
  score.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 0";
  secondsElapsed = 0;
  confetti.style.display = "none";
  playAgainButton.style.display = "none";
   startTimer();

  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "img/blank.jpg");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
   
  }
}

function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  const optionOneID = cardChosenID[0];
  const optionTwoID = cardChosenID[1];

  if (cardChosen[0] === cardChosen[1]) {
    cards[optionOneID].setAttribute("src", "img/white.jpg");
    cards[optionTwoID].setAttribute("src", "img/white.jpg");
    cards[optionOneID].removeEventListener("click", flipCard);
    cards[optionTwoID].removeEventListener("click", flipCard);
    cardsWon.push(cardChosen);
  } else {
    cards[optionOneID].setAttribute("src", "img/blank.jpg");
    cards[optionTwoID].setAttribute("src", "img/blank.jpg");
  }

  score.textContent = `Score: ${cardsWon.length}`;
  cardChosen = [];
  cardChosenID = [];

  if (cardsWon.length === cardArray.length / 2) {
    stopTimer();
    score.innerHTML = "Tebrikler kazandiniz...";
    confetti.style.display = "block";
    playAgainButton.style.display = "block";
  }
}

function flipCard() {
  const cardID = this.getAttribute("data-id");
  cardChosen.push(cardArray[cardID].name);
  cardChosenID.push(cardID);
  this.setAttribute("src", cardArray[cardID].img);

  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function resetGame() {
  clearInterval(timer); // Mevcut timer'ı durdur
  createBoard(); // Yeni oyun tahtasını oluştur
}

playAgainButton.addEventListener("click", resetGame);

createBoard();