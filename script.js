'use strict'

const gameBoard = (() => {
    const gameGrid = [];
    for (let i = 0; i < 9; i++) gameGrid.push('X');

    const render = () => {
        for (let i = 0; i < 9; i++) {
            const squareContent = document.getElementById(`s${i}`);
            squareContent.textContent = gameGrid[i];
        }        
    }
    return {render};
})();

const GameMechanic = (() => {

})();

const displayController = (() => {
    const gameBoardDOM = document.getElementById("game-board");
    const gameSquares = document.querySelectorAll(".game-square");
})();

const Player = () => {

};

gameBoard.render();

/*
To-do
*/