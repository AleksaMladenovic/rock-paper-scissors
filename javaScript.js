//getComputerChoice - randomly return "rock","paper" 
//  or "scissors"
//  get random num from 0 to 2 (0, 1 and 2)
//  0 => rock
//  1 => paper
//  2 => scissors
//  return the value
function getComputerChoice(){
    //random number between 0 and 2
    randomNumber =Math.round( Math.random()*2);
    if(randomNumber===0)
        return "rock";
    if(randomNumber===1)
        return "paper";
    if(randomNumber===2)
        return "scissors";    
}

//getHumanChoice 
//  from prompt user can type rock, paper or scissors
//  userTyped => lowCaseUserTyped
//  check if the lowCaseUserTyped is a correct value
//  if it is => return that lowCaseUserTyped
//  if not try again by calling function!

function getHumanChoice(){
    let humanChoice = prompt("Choose your simbol!\nRock, Paper or Scissors!");
    if(humanChoice.toLowerCase()==="rock"
        ||humanChoice.toLocaleLowerCase()==="paper"
        ||humanChoice.toLocaleLowerCase()==="scissors")
        return humanChoice.toLowerCase();
    console.log("Spell right!");
    return getHumanChoice();
}

//humanScore variable - for the humans wins 
//  initialValue = 0
//  it will icrease by the human winning

//computerScore variable - for the computers wins
// initial value = 0
// it will increase by the computer winning

//function for who win
//  getTheWinner with two arguments
//  rock        wins against    scissors
//  scissors    wins against    paper
//  paper       wins against    rock
//  return 0 if first argument win
//  return 1 if seccond argument win
//  return 2 if all is equal

//logic for a single round
//  function playRound with arguments: humanChoice and computerChoice
//  call getHumanChoice
//  call getComputerChoice 
//  call getTheWinner with humanChoice and computerChoice
//  if return is 0
//      then console.log You win!
//      console.log humanChoice beats computerChoice
//      increment humanScore
//  else if return is 1
//      console.log You lose! 
//      console.log computerChoice beats humanChoice
//      increment computerScore
//  else
//      console.log You and computer are equal
//      call again playRound 
//  if is is equal => call single round again
//

//logic for the entire game
//  function called playGame
//  inside this function will be declared variables
//  humanScore and computerScore
//  function for single round playRound
//  
//  call the single round function 5 times or until
//      any player reach the 3 wins
//  console.log who wins!
//  wait few secconds
//  check if user wants to play again
//  if he want to play again clear console and call playGame
//  if he dont want to play again just clear console!