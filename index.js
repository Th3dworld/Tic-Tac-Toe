const Gameboard = (function(){
    const gameboard = [[".",".","."],[".",".","."],[".",".","."]]

    function checkWinner(playerSymbol){
        if(gameboard[0].every === playerSymbol){
            return true;
        }
        else if(gameboard[1].every === playerSymbol){
            return true;
        }
        else if(gameboard[2].every === playerSymbol){
            return true;
        }
    }

    function play(playerSymbol, row, column){
        gameboard[row][column] = playerSymbol
    }

    return {
        gameboard,
        play
    }
})();