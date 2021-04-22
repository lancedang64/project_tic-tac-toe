'use strict'

const gameBoard = (() => {
    const gameGrid = [];
    for (let i = 0; i < 9; i++) gameGrid.push('');

    let currentPlayer;

    const startNewGame = () => {
        currentPlayer = player1;
    };

    const playMove = (e) => {
        const squareSelected = e.target.id.slice(1);
        gameGrid[squareSelected] = currentPlayer.symbol;
        render();
        switchCurrentPlayer()
    };
    
    const render = () => {
        for (let i = 0; i < 9; i++) {
            const squareContent = document.getElementById(`c${i}`);
            squareContent.textContent = gameGrid[i];
        }        
    };

    const switchCurrentPlayer = () => {
        if (currentPlayer == player1) currentPlayer = player2;
        else currentPlayer = player1;
    };

    return {startNewGame, playMove};
})();

const displayController = (() => {
    const addPlayListeners = () => {
        const gameSquares = document.querySelectorAll(".game-square");
        gameSquares.forEach(square => {
            square.addEventListener('click', gameBoard.playMove);
        });
    };
    return {addPlayListeners};
})();

const Player = (name, symbol) => {
    return {name, symbol};
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