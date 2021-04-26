"use strict";

const gameBoard = (() => {
  const gameGridArray = Array(9).fill("");

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

  const isMoveValid = (squareSelected) => gameGridArray[squareSelected] === "";

  const getCurrentSymbolLocations = () => {
    return currentPlayer == player1 ? xLocations : oLocations;
  };

  const updateSymbolLocation = (squareSelected) => {
    const indexSelected = parseInt(squareSelected);
    getCurrentSymbolLocations().push(indexSelected);
  };

  const updateGridArray = (squareSelected) => {
    gameGridArray[squareSelected] = currentPlayer.symbol;
  };

  const render = (squareSelected) => {
    const gameSquare = document.getElementById(`s${squareSelected}`);
    const squareContent = document.createElement("p");
    squareContent.className = "game-square-content";
    squareContent.textContent = gameGridArray[squareSelected];
    gameSquare.appendChild(squareContent);
  };

  const isPlayerWin = () => {
    // check if any winConditionArray is subset of X or O location arrays
    const winCondition = winConditionArrays.find((winCondition) =>
      isArraySubsetOfAnother(winCondition, getCurrentSymbolLocations())
    );
    return Boolean(winCondition);
  };

  const isATie = () => xLocations.length === 5;

  const isArraySubsetOfAnother = (subset, superset) => {
    const foundItems = subset.filter((subsetItem) => {
      const foundItem = superset.find(
        (superSetItem) => superSetItem === subsetItem
      );
      return foundItem === 0 ? true : foundItem;
    });
    return foundItems.length === subset.length;
  };

  const endGame = (result) => {
    displayController.displayResult(
      result === "win" ? currentPlayer.name : "tie"
    );
    displayController.removeListeners();
  };

  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
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
    resultText.className = "result";
    resultText.textContent =
      result === "tie" ? "It's a tie!" : `${result} is the winner!`;
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
- New Game button
- HTML flairs (need to design)
*/
