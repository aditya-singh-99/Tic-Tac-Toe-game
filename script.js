function startGame() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    initializeGame();
}

function resetGame() {
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("board").innerHTML = "";
    document.getElementById("congratulations").innerText = "";
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("congratulationsScreen").style.display = "none";
    initializeGame();
}

function initializeGame() {
    const board = document.getElementById("board");
    const currentPlayerDisplay = document.getElementById("currentPlayer");
    const congratulations = document.getElementById("congratulations");
    const resetButton = document.getElementById("resetButton");
    const congratulationsScreen = document.getElementById("congratulationsScreen");
    const cells = [];
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    updateCurrentPlayerDisplay();

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => cellClick(i));
        cells.push(cell);
        board.appendChild(cell);
    }

    function cellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            cells[index].innerText = currentPlayer;
            cells[index].classList.add(currentPlayer === "X" ? "playerX" : "playerO");
            currentPlayer = currentPlayer === "X" ? "O" : "X";

            updateCurrentPlayerDisplay();

            if (checkWinner()) {
                setTimeout(() => {
                    congratulations.innerText = `${currentPlayer === "X" ? "O" : "X"} wins! Congratulations!`;
                    congratulations.style.color = currentPlayer === "X" ? "#e74c3c" : "#3498db";
                    congratulationsScreen.style.display = "block";
                    resetButton.style.display = "block";
                    document.getElementById("gameScreen").style.display = "none";
                }, 1000);
            } else if (!gameBoard.includes("")) {
                setTimeout(() => {
                    congratulations.innerText = "It's a draw!";
                    congratulations.style.color = "#e67e22";
                    congratulationsScreen.style.display = "block";
                    resetButton.style.display = "block";
                    document.getElementById("gameScreen").style.display = "none";
                }, 1000);
            }
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");

                return true;
            }
        }

        return false;
    }

    function updateCurrentPlayerDisplay() {
        currentPlayerDisplay.innerText = `Current Player: ${currentPlayer}`;
    }
}