
// Selecting all the buttons of the game
let boxes = document.querySelectorAll(".button");

// Selecting the restart button
let restart = document.querySelector("#Re");

// Selecting the score buttons
let scoreBoxes = document.querySelectorAll(".vi");

// Variables to store the scores
let playerScore = 0;
let computerScore = 0;

// This variable checks whether the game is over
let gameOver = false;


// All possible winning combinations
let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// Adding click event to all 9 boxes
boxes.forEach(function(box) {

    box.addEventListener("click", function() {

        // Check if game is over or box is already filled
        if (gameOver || box.innerText !== "") {
            return;
        }

        // Player places X
        box.innerText = "X";

        // Check if player has won
        if (checkWinner("X")) {
            alert("Congratulations! You Won!");

            playerScore++;
            updateScore();

            gameOver = true;
            return;
        }

        // Check if all boxes are filled
        if (checkDraw()) {
            alert("Game Draw!");
            gameOver = true;
            return;
        }

        // Computer makes its move
        computerTurn();

    });

});


// Function to check the winner
function checkWinner(mark) {

    for (let combination of winningCombinations) {

        let a = combination[0];
        let b = combination[1];
        let c = combination[2];

        if (
            boxes[a].innerText === mark &&
            boxes[b].innerText === mark &&
            boxes[c].innerText === mark
        ) {
            return true;
        }

    }

    return false;
}


// Function for computer's turn
function computerTurn() {

    // Find all empty boxes
    let emptyBoxes = [];

    for (let box of boxes) {

        if (box.innerText === "") {
            emptyBoxes.push(box);
        }

    }

    // Choose a random empty box
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);

    let computerBox = emptyBoxes[randomIndex];

    // Computer places O
    computerBox.innerText = "O";


    // Check if computer has won
    if (checkWinner("O")) {

        alert("Computer Won!");

        computerScore++;
        updateScore();

        gameOver = true;
        return;
    }

    // Check for draw
    if (checkDraw()) {

        alert("Game Draw!");
        gameOver = true;

    }

}


// Function to check whether the game is a draw
function checkDraw() {

    for (let box of boxes) {

        if (box.innerText === "") {
            return false;
        }

    }

    return true;
}


// Function to update the scores
function updateScore() {

    scoreBoxes[0].innerHTML = "You<br>" + playerScore;

    scoreBoxes[1].innerHTML = "Comp<br>" + computerScore;

}


// Restart button
restart.addEventListener("click", function() {

    // Empty all 9 boxes
    boxes.forEach(function(box) {
        box.innerText = "";
    });

    // Start a new game
    gameOver = false;

});
