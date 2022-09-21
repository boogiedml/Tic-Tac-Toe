const xClass = "x";
const oClass = "o";
const cellElements = document.querySelectorAll(".cell")
const board = document.getElementById("board")
const winningMsg = document.getElementById("winning-msg")
const winningMsgTxt = document.querySelector(".winning-msg-txt")
const restartBtn = document.getElementById('restartBtn')
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let oTurn;

startGame();

restartBtn.addEventListener('click', startGame)

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMsg.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? oClass : xClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endgame(false);
    } else if (isDraw()) {
        endgame(true);
    }else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endgame(draw) {
    if (draw) {
        winningMsgTxt.textContent = "!Draw 😎";
    } else {
        winningMsgTxt.textContent = `${oTurn ? "O player" : "X player"} Wins! 🎉`;
    }
    winningMsg.classList.add("show");
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if (oTurn) {
        board.classList.add(oClass);
    } else {
        board.classList.add(xClass);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
