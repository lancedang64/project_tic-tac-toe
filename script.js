"use strict";

const gameBoard = (() => {
  const gameGridArray = [];
  for (let i = 0; i < 9; i++) gameGridArray.push("");

  const xLocations = [];
  const oLocations = [];

  const winConditionArrays = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  let currentPlayer;

  const startNewGame = () => {
    displayController.addListeners();
    currentPlayer = player1;
  };

  const playMove = (e) => {
    const squareSelected = e.target.id.slice(1);
    if (!isMoveValid(squareSelected)) return;
    else {
      updateSymbolLocation(squareSelected);
      updateGridArray(squareSelected);
      render(squareSelected);
      if (isPlayerWin()) endGame("win");
      else if (isATie()) endGame("tie");
      else switchCurrentPlayer();
    }
  };

  const isMoveValid = (squareSelected) => {
    if (gameGridArray[squareSelected] !== "") return false;
    else return true;
  };

  const updateSymbolLocation = (squareSelected) => {
    const indexSelected = parseInt(squareSelected);
    if (currentPlayer == player1) xLocations.push(indexSelected);
    else oLocations.push(indexSelected);
  };

  const updateGridArray = (squareSelected) => {
    gameGridArray[squareSelected] = currentPlayer.symbol;
  };

  const render = (squareSelected) => {
    const squareContent = document.getElementById(`c${squareSelected}`);
    squareContent.textContent = gameGridArray[squareSelected];
  };

  const isPlayerWin = () => {
    // check if any winConditionArray is subset of X or O location arrays
    let currentSymbolLocations;
    if (currentPlayer == player1) currentSymbolLocations = xLocations;
    else currentSymbolLocations = oLocations;
    let isPlayerWin = false;

    winConditionArrays.forEach((winCondition) => {
      if (isArraySubsetOfAnother(winCondition, currentSymbolLocations)) {
        isPlayerWin = true;
        return;
      }
    });
    return isPlayerWin;
  };

  const isATie = () => {
    if (xLocations.length === 5) return true;
    else return false;
  };

  const isArraySubsetOfAnother = (subset, superset) => {
    for (let i = 0; i < subset.length; i++) {
      for (let j = 0; j < superset.length; j++) {
        if (subset[i] == superset[j]) {
          break;
        } else if (j == superset.length - 1) return false;
      }
    }
    return true;
  };

  const endGame = (result) => {
    if (result === "win") displayController.displayResult(currentPlayer.name);
    else displayController.displayResult("tie");
    displayController.removeListeners();
  };

  const switchCurrentPlayer = () => {
    if (currentPlayer == player1) currentPlayer = player2;
    else currentPlayer = player1;
  };

  return {
    startNewGame,
    playMove,
  };
})();

const displayController = (() => {
  const gameSquares = document.querySelectorAll(".game-square");
  const contentDiv = document.querySelector(".content");

  const addListeners = () => {
    gameSquares.forEach((square) => {
      square.addEventListener("click", gameBoard.playMove);
    });
  };

  const removeListeners = () => {
    gameSquares.forEach((square) => {
      square.removeEventListener("click", gameBoard.playMove);
    });
  };

  const displayResult = (result) => {
    const resultText = document.createElement("h1");
    if (result === "tie") resultText.textContent = "It's a tie!";
    else resultText.textContent = `${result} is the winner!`;
    contentDiv.insertBefore(resultText, contentDiv.firstChild);
  };

  return { addListeners, removeListeners, displayResult };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

gameBoard.startNewGame();

/*
To-do
- Announce winner on UI
- New Game button
- user case: tie game
- HTML flairs (need to design)
- animation for placing X and O on the board
*/
