import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = '';
let playerScoreNumber = 0;
let computerScoreNumber = 0;

// Reset all 'selected icons
function resetSelected(){
  allGameIcons.forEach((element) => {
    element.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
}

// ResetScore & playerChoice/computerChoice
function resetAll(){
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = ''; 
  resetSelected();  
}
window.resetAll = resetAll;

// Computer Random Choice
function computerRandomChoice(){
  const computerChoiceNumber = Math.random();
  if(computerChoiceNumber < 0.2){
    computerChoice = 'rock';
  }else if(computerChoiceNumber <= 0.4){
    computerChoice = 'paper';
  }else if(computerChoiceNumber <= 0.6){
    computerChoice = 'scissors';
  }else if(computerChoiceNumber <= 0.8){
    computerChoice = 'lizard';
  }else{
    computerChoice = 'spock';
  }  
}

// display choice common method
function displayChoice(choice, isPlayer){
  let icon = {};
  let text = '';

  switch(choice){
    case 'rock':
      icon = isPlayer ? playerRock : computerRock;
      text = 'Rock';
      break;
    case 'paper':
      icon = isPlayer ? playerPaper : computerPaper;
      text = 'Paper';
      break;
    case 'scissors':
      icon = isPlayer ? playerScissors : computerScissors;
      text = 'Scissors';
      break;
    case 'lizard':
      icon = isPlayer ? playerLizard : computerLizard;
      text = 'Lizard';
      break;
    case 'spock':
      icon = isPlayer ? playerSpock : computerSpock;
      text = 'Spock';
      break;
    default:
      break;
  }  

  if(icon){
    icon.classList.add('selected');
    if(isPlayer){
      playerChoiceEl.textContent = ' --- ' + text;
    }else{
      computerChoiceEl.textContent = ' --- ' + text;
    }    
  }
}

// Add 'selected styling & computerChoice
function displayComputerChoice(){
  displayChoice(computerChoice, false);
}

//  Check results , increase scores, update result text
function updateScore(playerChoice){

  if(playerChoice === computerChoice){
    resultText.textContent = "It's a tie.";
  }else{
    const choice = choices[playerChoice];
    
    if(choice.defeats.indexOf(computerChoice) > -1){
      startConfetti();
      resultText.textContent = "You Won!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    }else{      
      resultText.textContent = "You Lost!";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// Call functions to process turn
function checkResults(playerChoice){
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// Passing player selection value and styling icons
function selectChoice(playerChoice){
  checkResults(playerChoice);
  displayChoice(playerChoice, true);
}
window.selectChoice = selectChoice;

//  On startup set initial values
resetAll();

