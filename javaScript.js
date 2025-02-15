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
  if (humanChoice === computerChoice) return "even";
  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "rock")
  )
    return "human";
  else return "computer";
}

function playRound(e) {
  let humanChoice;
  if (e.target.tagName == "IMG") {
    humanChoice = e.target.id;
  }else{
    return;
  }

  computerChoice = getComputerChoice();
  roundWinner = getTheRoundWinner(humanChoice, computerChoice);
  console.log(`Your ${humanChoice} VS Computers ${computerChoice}`);
  switch (roundWinner) {
    case "even":
      console.log("You and the computer had the same simbols!");
      break;
    case "human":
      console.log("Congratulations! You win!");
      break;
    case "computer":
      console.log("Unfortunately, you lose!");
      break;
  }
  displayRound(humanChoice, computerChoice, roundWinner);
  let gameEnd = humanScore>=3 || computerScore>=3;
  if(gameEnd){
    displayGameEnd();
  }else{
    btnNextRound.style.display = 'inline';
  }

}

function displayRound(humanChoice, computerChoice, roundWinner) {
  let humanElement = document.querySelector("#" + humanChoice);
  let computerElement = document.querySelector("#" + computerChoice);
  
  imagesForChoose.innerHTML = "";
  if(humanElement===computerElement){
    computerElement = humanElement.cloneNode();
    computerElement.id = "same";
  }
  imagesForChoose.appendChild(humanElement);
  imagesForChoose.appendChild(computerElement);

  switch (roundWinner) {
    case "even":
      roundResultDiv.textContent = "You and the computer had the same simbols!";
      break;
    case "human":
      roundResultDiv.textContent = "Congratulations! You win round!";
      humanScore++;
      break;
    case "computer":
      roundResultDiv.textContent = "Unfortunately, you lose round!";
      computerScore++;
      break;
  }

  

  humanScoreElement.textContent = humanScore;
  computerScoreElement.textContent = computerScore;

  
}
function displayGameEnd(){
    btnNextRound.style.display = 'none';
    if(humanScore>computerScore){
        imagesForChoose.innerHTML = '<h1>Congratulations! You win!</h1>';
        body.style.backgroundColor = 'green';
    }else{
        imagesForChoose.innerHTML = '<h1>Unfortunately, You lose!</h1>';
        body.style.backgroundColor = 'red';
    }

}
function playGame() {
  while (humanScore < 3 && computerScore < 3) {
    console.log(`Round: ${roundCounter}`);
    let roundResult = playRound();
    if (roundResult === 0) {
      humanScore++;
      roundCounter++;
    } else if (roundResult === 1) {
      computerScore++;
      roundCounter++;
    }
    console.log(`Result: You vs Computer ${humanScore}:${computerScore}`);
  }
  let endMessage;
  if (humanScore === 3)
    //human wins
    endMessage = `  Congradulations! 
        You win whole game with score: ${humanScore}:${computerScore}
        Do you want to play again?`;
  else
    endMessage = `  Unfortunately! 
        You lose whole game with score: ${humanScore}:${computerScore}
        Do you want to play again?`;
  if (confirm(endMessage)) {
    console.clear();
    playGame();
  }
  console.clear();
}

const btnStartGame = document.querySelector("#btnStartGame");
const btnRestartGame = document.querySelector("#btnRestartGame");
const btnNextRound = document.querySelector("#btnNextRound");
btnRestartGame.style.display = 'none';
btnNextRound.style.display = 'none';

let humanScore = 0;
let computerScore = 0;
const imagesForChoose = document.querySelector("#images-for-choose");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const roundResultDiv = document.querySelector("#round-result");
const humanScoreElement = document.querySelector(".user-score");
const computerScoreElement = document.querySelector(".computer-score");
const body = document.querySelector('body');


restartAll()


btnStartGame.addEventListener("click", () => {
  
    imagesForChoose.addEventListener("click",playRound);
    btnRestartGame.style.display = 'inline';
    btnStartGame.style.display = 'none';
});

btnRestartGame.addEventListener('click',()=>{
    restartAll();
    btnRestartGame.style.display = 'none';
    btnNextRound.style.display = 'none';
    btnStartGame.style.display = 'inline';

})

btnNextRound.addEventListener('click',()=>{
    restartImages();
    roundResultDiv.textContent = '';
})

function restartImages(){
    imagesForChoose.innerHTML = '';
    imagesForChoose.appendChild(rock);
    imagesForChoose.appendChild(paper);
    imagesForChoose.appendChild(scissors);
}

function restartAll(){
    humanScore = 0;
    computerScore = 0;
    humanScoreElement.textContent = humanScore;
    computerScoreElement.textContent = computerScore;
    restartImages();
    imagesForChoose.removeEventListener('click',playRound);
    roundResultDiv.textContent = '';
    body.style.backgroundColor = 'white';
}