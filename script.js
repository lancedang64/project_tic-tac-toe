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
    currentPlayer = player1;
  };

  const playMove = (e) => {
    const squareSelected = e.target.id.slice(1);
    if (!isMoveValid(squareSelected)) return;
    else {
      updateSymbolLocation(squareSelected);
      updateGridArray(squareSelected);
      render(squareSelected);
      if (isGameOver()) {
        endGame(currentPlayer);
        return;
      } else switchCurrentPlayer();
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

  const isGameOver = () => {
    // check if any winConditionArray is subset of X or O arrays
    console.log("checking if game is over");
    let currentSymbolLocations;
    if (currentPlayer == player1) currentSymbolLocations = xLocations;
    else currentSymbolLocations = oLocations;
    let isGameOver = false;

    winConditionArrays.forEach((winCondition) => {
      if (isArraySubsetOfAnother(winCondition, currentSymbolLocations)) {
        isGameOver = true;
        return;
      }
    });
    return isGameOver;
  };

  const isArraySubsetOfAnother = (subsetArray, supersetArray) => {
    for (let i = 0; i < subsetArray.length; i++) {
      for (let j = 0; j < supersetArray.length; j++) {
        if (subsetArray[i] == supersetArray[j]) {
          break;
        } else if (j == supersetArray.length - 1) return false;
      }
    }
    return true;
  };

  const endGame = (currentPlayer) => {
    // freeze display
    console.log(`Game Over, ${currentPlayer.name} is the winner`);
  };

  const switchCurrentPlayer = () => {
    if (currentPlayer == player1) currentPlayer = player2;
    else currentPlayer = player1;
  };

  return {
    startNewGame,
    playMove,
    xLocations,
    oLocations,
    isArraySubsetOfAnother,
  };
})();

const displayController = (() => {
  const addPlayListeners = () => {
    const gameSquares = document.querySelectorAll(".game-square");
    gameSquares.forEach((square) => {
      square.addEventListener("click", gameBoard.playMove);
    });
  };
  return { addPlayListeners };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

displayController.addPlayListeners();
gameBoard.startNewGame();

//Auto-start new game on site open
//gameMechanic.startNewGame(player1,player2);

/*
To-do
*/
