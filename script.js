/*Variables*/

const choices = document.querySelector(".choices");
const playerHP = document.querySelectorAll(".player .hp-container .hp");
const computerHP = document.querySelectorAll(".computer .hp-container .hp");
const playerImg = document.querySelector(".player .image-container img");
const computerImg = document.querySelector(".computer .image-container img");
const playerImgContainer = document.querySelector('.player .image-container');
const computerImgContainer = document.querySelector('.computer .image-container');
const result = document.querySelector(".result");

let playerHPCount = 3;
let computerHPCount = 3;

let computerSelection;
let playerSelection;

function playRound(event) {

    playerImgContainer.style.backgroundColor = computerImgContainer.style.backgroundColor = "";

    playerSelection = event.target.innerHTML.toLowerCase();
    if (playerSelection == "sciss.") playerSelection = "scissors";
    computerSelection = computerPlay();

    displayPicture(playerSelection, computerSelection, outcome(playerSelection, computerSelection));
    result.innerHTML = displayOutcome(playerSelection, computerSelection);
    displayHP(reduceHP(outcome(playerSelection, computerSelection)));

    gameEnd(checkEnd(playerHPCount, computerHPCount));

}

/*Functions*/

//Makes the computer choose a random play
function computerPlay() {

    let number = Math.floor(Math.random() * 3);
    
    switch (number) {
        case 0:
        return 'rock';

        case 1:
        return 'paper';

        case 2:
        return 'scissors';
    }

}

function outcome(playerSelection, computerSelection) {

    if (playerSelection == computerSelection) {
        return "TIE";
    }

    switch (playerSelection) {
        case 'rock':
            if(computerSelection == 'paper') {
                return "LOSE"
            }

            if (computerSelection == 'scissors') {
                return "WIN"
            }


        case 'paper':
            if(computerSelection == 'scissors') {
                return "LOSE";
            }

            if (computerSelection == 'rock') {
                return "WIN";
            }

        case 'scissors':
            if(computerSelection == 'rock') {
                return "LOSE";
            }

            if (computerSelection == 'paper') {
                return "WIN";
            }

    }

}

//Outcome (computer POV)
function computerOutcome(outcome) {
    if (outcome == "TIE") return "TIE";
    if (outcome == "LOSE") return "WIN";
    if (outcome == "WIN") return "LOSE";
}

//Change pictures depending on the selection and outcome
function displayPicture(playerSelection, computerSelection) {

    playerImg.src = `images/${playerSelection}_${outcome(playerSelection, computerSelection).toLowerCase()}.png`;
    computerImg.src = `images/${computerSelection}_${computerOutcome(outcome(playerSelection, computerSelection)).toLowerCase()}.png`;

    if (outcome(playerSelection, computerSelection) == "WIN") {
        playerImgContainer.style.backgroundColor= "#EEEEEE";
    }

    if (outcome(playerSelection, computerSelection) == "LOSE") {
        computerImgContainer.style.backgroundColor= "#EEEEEE";
    }

}

//Change result message to display the outcome
function displayOutcome(playerSelection, computerSelection) {
    
    if (playerSelection == computerSelection) {
        return `It's a tie. <br> you both chose ${playerSelection}.`.toUpperCase();
    }

    switch (playerSelection) {
        case 'rock':
            if(computerSelection == 'paper') {
                return 'You lose. <br> Paper beats rock.'.toUpperCase();
            }

            if (computerSelection == 'scissors') {
                return 'You win. <br> Rock beats scissors.'.toUpperCase();;
            }


        case 'paper':
            if(computerSelection == 'scissors') {
                return 'You lose. <br> Scissors beat paper.'.toUpperCase();
            }

            if (computerSelection == 'rock') {
                return 'You win. <br> Paper beats rocks.'.toUpperCase();
            }

        case 'scissors':
            if(computerSelection == 'rock') {
                return 'You lose. <br> Rock beats scissors.'.toUpperCase();
            }

            if (computerSelection == 'paper') {
                return 'You win. <br> Scissors beat paper.'.toUpperCase();
            }

    }
}

function reduceHP(outcome) {
    if (outcome == "TIE") {
        return;
    }

    if (outcome == "LOSE") {
        return ['player', --playerHPCount];
    }

    if (outcome == "WIN") {
        return ['computer', --computerHPCount];
    }
}

function displayHP(reduceHP) {

    //Tie
    if (!reduceHP) return;

    //Victory / Defeat
    if (reduceHP[0] == 'player') {
        playerHP[reduceHP[1]].style.visibility="hidden";
    }

    if (reduceHP[0] == 'computer') {
        computerHP[reduceHP[1]].style.visibility="hidden";
    }
}

//After each round, checks if someone won.
function checkEnd(playerHPCount, computerHPCount) {
    if (computerHPCount == 0) {
        return "VICTORY";
    }

    if (playerHPCount == 0) {
        return "DEFEAT";
    }
}

//If someone won, end the game and ask if the player would like to play again.
function gameEnd(checkEnd) {

    if (checkEnd) {
        choices.removeEventListener("click", playRound);
        choices.removeEventListener("keydown", keyboardPlay)
        choices.removeEventListener("mouseover", changeFocus);
        displayEnd(checkEnd);
    }
}

function displayEnd(checkEnd) {

    let replay = `<br>WOULD YOU LIKE TO PLAY AGAIN ?
    <ul>
        <li tabindex='4'>SURE, THIS IS FUN.</li>
        <li tabindex='5'>NO, I'D RATHER MINDLESSLY STARE AT MY SCREEN.</li>
    </ul>`

    if (checkEnd == "VICTORY") {
    result.innerHTML = `CONGRATULATIONS. YOU WON.` + replay;

    }

    if (checkEnd == "DEFEAT") {
    result.innerHTML = `YOU LOST THIS TIME, BUT YOU MIGHT WIN NEXT TIME.` + replay;
    }


    //Navigation with keyboard arrows / tabs
    let replayChoices = document.querySelector('.result ul');
    replayChoices.firstElementChild.focus();
    replayChoices.addEventListener("keydown", keyboardPlay);
    replayChoices.firstElementChild.addEventListener("click", restart);
    replayChoices.addEventListener("mouseover", changeFocus);

}

//Restart the game
function restart() {

    //Reset message
    result.innerHTML = `WELCOME TO ROCK - PAPER - SCISSORS.<br> CHOOSE A PLAY TO START.`;

    //Reset pictures
    playerImg.src = '';
    computerImg.src = '';
    playerImgContainer.style.backgroundColor = computerImgContainer.style.backgroundColor = '';
    
    //Reset Health
    playerHPCount = computerHPCount = 3;

    for (let hp of playerHP) {
        hp.style.visibility = 'visible';
    }

    for (let hp of computerHP) {
        hp.style.visibility = 'visible';
    }

    //Allow choices again
    choices.addEventListener("click", playRound)
    choices.addEventListener("keydown", keyboardPlay)
    choices.addEventListener("mouseover", changeFocus);
    
}

/*Reset*/
document.querySelector(".reset").addEventListener("click", restart);

/*Keyboard Play*/

function keyboardPlay(event) {

    if (event.code == 'ArrowUp') {
        if (event.target == event.target.parentNode.firstElementChild) return;
        event.target.previousElementSibling.focus();
    }

    if (event.code == 'ArrowDown') {
        if (event.target == event.target.parentNode.lastElementChild) return;
        event.target.nextElementSibling.focus();
    }

    if (event.code == "Space" || event.code == "Enter") {

        if (event.target.parentNode == choices) {
            playRound(event);
        }

        else {

            let replayChoices = document.querySelector('.result ul');
            
            if (event.target == replayChoices.firstElementChild) restart();
            else return;
            
        }

    }

    if (event.target == event.target.parentNode.lastElementChild && event.code == 'Tab') {
        event.target.parentNode.firstElementChild.focus();
        event.preventDefault();
    }

}

//Remove focus from a previous element if I mouseover another element.
function changeFocus(event) {
    if (event.target == document.activeElement) return ;
    document.activeElement.blur();
    event.target.focus();
}


restart();