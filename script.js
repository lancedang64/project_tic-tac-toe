'use strict'

const gameBoard = (() => {
    const gameGrid = [];
    for (let i = 0; i < 9; i++) gameGrid.push(i);

    return {gameGrid};
})();

const GameMechanic = (() => {

})();

const Player = () => {

};

const gameBoardDOM = document.getElementById("game-board");
const gameSquares = document.querySelectorAll(".game-square");

for (let i=0; i<9; i++) {
    const square = document.getElementById(`s${i}`);
    square.textContent = gameBoard.gameGrid[i];
}

/*
To-do
- try flexbox with 3 rows for grids

*/