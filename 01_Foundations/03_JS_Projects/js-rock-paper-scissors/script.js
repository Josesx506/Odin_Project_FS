const userScoreboard = document.getElementById('user-score');
const computerScoreboard = document.getElementById('computer-score');
const roundResults = document.querySelector(".roundResults");
const gameResults = document.querySelector(".gameResults");
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");

let numRounds = 0;
let computerScore = 0;
let userScore = 0;

function getComputerChoice() {
    var rk = "rock"
    var pp = "paper"
    var sc = "scissors"
    var arr = [rk, pp, sc]
    var option = arr[(Math.floor(Math.random() * arr.length))]
    return option;
};

function playRound(playerSelection,computerSelection) {
    var player = playerSelection.toLowerCase();
    var computer =  computerSelection.toLowerCase();

    var verdict;

    if (player === computer) {
        verdict = "It's a tie, " + player + " equals " + computer; 
    } 
    else if ((player === "rock") && (computer === "scissors")) {
        verdict = "You win, " + player + " beats " + computer;
        userScore++;
    } 
    else if ((player === "scissors") && (computer === "paper")) {
        verdict = "You win, " + player + " beats " + computer;
        userScore++;
    } 
    else if ((player === "paper") && (computer === "rock")) {
        verdict = "You win, " + player + " beats " + computer;
        userScore++;
    } 
    else {
        verdict = "You lose, " + player + " loses to " + computer; 
        computerScore++;
    }
    numRounds++;
    userScoreboard.textContent = userScore;
    computerScoreboard.textContent = computerScore;
    if (numRounds === 5) {
        setGameOver()
    }

    return verdict;
};

function playGame(event) {

    var userInput = event.target.className;
    var computerInput = getComputerChoice();
    var results = playRound(userInput, computerInput);
    roundResults.textContent = "Round " + numRounds + ": " + results;
}

function announceWinner(userTotal, computerTotal) {
    var winner;

    if (userTotal === computerTotal) {
        winner = "It's a tie";
    } 
    else if (userTotal > computerTotal) {
        winner = "User won with " + userTotal + " points vs Computer's " + computerTotal;
    } 
    else {
        winner = "Computer won with " + computerTotal + " points vs User's " + userTotal;
    }

    return winner;
}

function resetGame() {
    numRounds = 0;
    computerScore = 0;
    userScore = 0;

    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;
    userScoreboard.textContent = "";
    computerScoreboard.textContent = "";

    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);
}

function setGameOver() {
    gameResults.textContent = "Final Scores: " + announceWinner(userScore, computerScore);
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
    
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    resetButton.className = "reset-btn";
    document.getElementsByClassName("resultParas")[0].appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

rockBtn.addEventListener('click', playGame);
paperBtn.addEventListener('click', playGame);
scissorsBtn.addEventListener('click', playGame);