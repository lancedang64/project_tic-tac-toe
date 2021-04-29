'use strict';

const gameBoard = (() => {
  let gameGridArray = Array(9).fill('');

  let xLocations = [];
  let oLocations = [];

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

  let player1, player2, currentPlayer;

  const startNewGame = () => {
    assignPlayer('player-1');
    assignPlayer('player-2');
    currentPlayer = player1;
    resetBoard();
    displayController.addSquareListeners();
    if (player1.type === 'bot') player1.playBotMove(gameGridArray);
  };

  const assignPlayer = (player) => {
    const playerType = document.querySelector(`[name="${player}-type"]:checked`)
      .value;
    const playerName = document.getElementById(player).value;
    player === 'player-1'
      ? (player1 = getPlayerObject(playerName, playerType, 'X'))
      : (player2 = getPlayerObject(playerName, playerType, 'O'));
  };

  const getPlayerObject = (name, type, symbol) => {
    return type === 'human'
      ? Player(name, type, symbol)
      : Bot(name + "-bot", type, symbol);
  };

  const resetBoard = () => {
    gameGridArray = gameGridArray.map((element) => (element = ''));
    xLocations = [];
    oLocations = [];
    const playedMoves = document.querySelectorAll('.game-square-content');
    playedMoves.forEach((playedMove) => playedMove.remove());
    const lastRoundResult = document.querySelector('.result');
    if (lastRoundResult) lastRoundResult.remove();
  };

  const playMove = (e) => {
    console.log(e);
    const squareSelected = e.target.id.slice(1);
    if (!isMoveValid(squareSelected)) return;
    else {
      updateSymbolLocation(squareSelected);
      updateGridArray(squareSelected);
      render(squareSelected);
      if (isPlayerWin()) endGame('win');
      else if (isATie()) endGame('tie');
      else switchCurrentPlayer();
    }
  };

  const isMoveValid = (squareSelected) => gameGridArray[squareSelected] === '';

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
    const squareContent = document.createElement('p');
    squareContent.className = 'game-square-content';
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
      result === 'win' ? currentPlayer.name : 'tie'
    );
    displayController.removeSquareListeners();
  };

  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    if (currentPlayer.type === 'bot')
      setTimeout(() => {
        currentPlayer.playBotMove(gameGridArray);
      }, 500);
  };

  return {
    startNewGame,
    playMove,
  };
})();

const displayController = (() => {
  const newGameButton = document.querySelector('#new-game-button');
  const gameSquares = document.querySelectorAll('.game-square');
  const gameContentDiv = document.querySelector('.game-content');

  const addNewGameListener = () => {
    newGameButton.addEventListener('click', gameBoard.startNewGame);
  };

  const addSquareListeners = () => {
    gameSquares.forEach((square) => {
      square.addEventListener('click', gameBoard.playMove);
    });
  };

  const removeSquareListeners = () => {
    gameSquares.forEach((square) => {
      square.removeEventListener('click', gameBoard.playMove);
    });
  };

  const displayResult = (result) => {
    const resultText = document.createElement('p');
    resultText.className = 'result';
    resultText.textContent =
      result === 'tie' ? "It's a tie!" : `${result} is the winner!`;
    gameContentDiv.appendChild(resultText);
  };

  return {
    addNewGameListener,
    addSquareListeners,
    removeSquareListeners,
    displayResult,
  };
})();

const Player = (name, type, symbol) => {
  return { name, type, symbol };
};

const Bot = (name, type, symbol) => {
  const playBotMove = (gameGridArray) => {
    const botMove = getRandomMove(getPossibleMoves(gameGridArray));
    botClickScreen(botMove);
  };

  const getPossibleMoves = (gameGridArray) => {
    let possibleMoves = [];
    for (let i = 0; i < gameGridArray.length; i++) {
      if (gameGridArray[i] === '') possibleMoves.push(i);
    }
    return possibleMoves;
  };

  const getRandomMove = (array) => {
    const randomMove = array[Math.floor(Math.random() * array.length)];
    return randomMove;
  };

  const botClickScreen = (index) => {
    const selectedSquare = document.getElementById(`s${index}`);
    selectedSquare.click();
  };

  return { name, type, symbol, playBotMove };
};

displayController.addNewGameListener();
gameBoard.startNewGame();
/*
To-do
- UI change to choose bot or human
*/
