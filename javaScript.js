function getComputerChoice() {
  //random number between 0 and 2
  randomNumber = Math.floor(Math.random() * 3);
  if (randomNumber === 0) return "rock";
  if (randomNumber === 1) return "paper";
  if (randomNumber === 2) return "scissors";
}

function getHumanChoice() {
  let humanChoice = prompt("Choose your simbol!\nRock, Paper or Scissors!");
  if (
    humanChoice.toLowerCase() === "rock" ||
    humanChoice.toLocaleLowerCase() === "paper" ||
    humanChoice.toLocaleLowerCase() === "scissors"
  )
    return humanChoice.toLowerCase();
  console.log("Spell right!");
  return getHumanChoice();
}

function getTheRoundWinner(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    setBacColor(humanChoice);
    return "even";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "rock")
  ) {
    setBacColor(humanChoice);
    return "human";
  } else {
    setBacColor(computerChoice);
    return "computer";
  }
}
function setBacColor(simbol) {
  if (simbol === "rock") {
    body.style.backgroundColor = "#ff00fb";
  }
  if (simbol === "paper") {
    body.style.backgroundColor = "#f2ff2d";
  }
  if (simbol === "scissors") {
    body.style.backgroundColor = "#00dcff";
  }
}

function playRound(e) {
  imagesForChoose.removeEventListener("click", playRound);
  let humanChoice;
  if (e.target.tagName == "IMG") {
    humanChoice = e.target.id;
  } else {
    return;
  }

  computerChoice = getComputerChoice();
  roundWinner = getTheRoundWinner(humanChoice, computerChoice);
  displayRound(humanChoice, computerChoice, roundWinner);
  let gameEnd = humanScore >= 3 || computerScore >= 3;
  if (gameEnd) {
    displayGameEnd();
  } else {
    btnNextRound.style.display = "inline";
  }
}

function displayRound(humanChoice, computerChoice, roundWinner) {
  let humanElement = document.querySelector("#" + humanChoice);
  let computerElement = document.querySelector("#" + computerChoice);

  imagesForChoose.innerHTML = "";
  if (humanElement === computerElement) {
    computerElement = humanElement.cloneNode();
    computerElement.id = "same";
  }
  imagesForChoose.appendChild(humanElement);
  imagesForChoose.appendChild(computerElement);

  switch (roundWinner) {
    case "even":
      roundResultDiv.textContent = "You and the computer had the same simbols!";
      roundResultDiv.style.backgroundColor = 'white';
      roundResultDiv.classList.add('paddingResult');
      break;
    case "human":
      roundResultDiv.textContent = "Congratulations! You win round!";
      roundResultDiv.style.backgroundColor = 'green';
      roundResultDiv.classList.add('paddingResult');
      humanScore++;
      break;
    case "computer":
      roundResultDiv.textContent = "Unfortunately, you lose round!";
      roundResultDiv.style.backgroundColor = 'red';
      roundResultDiv.classList.add('paddingResult');
      computerScore++;
      break;
  }

  humanScoreElement.textContent = humanScore;
  computerScoreElement.textContent = computerScore;
}
function displayGameEnd() {
  btnNextRound.style.display = "none";
  let text;
  if (humanScore > computerScore) {
    text = "Congratulations! You win!";
    body.style.backgroundColor = "green";
  } else {
    text = "Unfortunately, You lose!";
    body.style.backgroundColor = "red";
  }
  imagesForChoose.innerHTML = '';
  roundResultDiv.textContent = text;
  roundResultDiv.classList.add('end-text');

}

const btnStartGame = document.querySelector("#btnStartGame");
const btnRestartGame = document.querySelector("#btnRestartGame");
const btnNextRound = document.querySelector("#btnNextRound");
btnRestartGame.style.display = "none";
btnNextRound.style.display = "none";

let humanScore = 0;
let computerScore = 0;
const imagesForChoose = document.querySelector("#images-for-choose");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const roundResultDiv = document.querySelector("#round-result");
const humanScoreElement = document.querySelector(".user-score");
const computerScoreElement = document.querySelector(".computer-score");
const body = document.querySelector("body");

restartAll();

btnStartGame.addEventListener("click", () => {
  imagesForChoose.addEventListener("click", playRound);
  btnRestartGame.style.display = "inline";
  btnStartGame.style.display = "none";
});

btnRestartGame.addEventListener("click", () => {
  restartAll();
  btnRestartGame.style.display = "none";
  btnNextRound.style.display = "none";
  btnStartGame.style.display = "inline";
});

btnNextRound.addEventListener("click", () => {
  btnNextRound.style.display='none';
  restartImages();
  imagesForChoose.addEventListener("click", playRound);
  body.style.backgroundColor = "white";
  roundResultDiv.textContent = "";
});

function restartImages() {
  imagesForChoose.innerHTML = "";
  imagesForChoose.appendChild(rock);
  imagesForChoose.appendChild(paper);
  imagesForChoose.appendChild(scissors);
  roundResultDiv.classList.remove('paddingResult');
  roundResultDiv.classList.remove('end-text');
}

function restartAll() {
  humanScore = 0;
  computerScore = 0;
  humanScoreElement.textContent = humanScore;
  computerScoreElement.textContent = computerScore;
  restartImages();
  imagesForChoose.removeEventListener("click", playRound);
  roundResultDiv.textContent = "";
  body.style.backgroundColor = "white";
}
