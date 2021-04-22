'use strict'

const gameBoard = (() => {
    const gameGrid = [];
    for (let i = 0; i < 9; i++) gameGrid.push('');

    const render = () => {
        for (let i = 0; i < 9; i++) {
            const squareContent = document.getElementById(`c${i}`);
            squareContent.textContent = gameGrid[i];
        }        
    };

    const playMove = (e) => {
        const squareSelected = e.target.id.slice(1);
        gameGrid[squareSelected] = "X";
        render();
    };
    return {playMove};
})();

const GameMechanic = (() => {

})();

const displayController = (() => {
    const gameBoardDOM = document.getElementById("game-board");

    const addPlayListeners = () => {
        const gameSquares = document.querySelectorAll(".game-square");
        gameSquares.forEach(square => {
            square.addEventListener('click', gameBoard.playMove);
        });
    };
    return {addPlayListeners};
})();

const Player = () => {

};

displayController.addPlayListeners();


/*
To-do
*/