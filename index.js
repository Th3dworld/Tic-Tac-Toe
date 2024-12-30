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
        else if(gameboard[0][0].every === playerSymbol && gameboard[1][1].every === playerSymbol && gameboard[2][2].every === playerSymbol){
            return true;
        }
        else if(gameboard[0][2].every === playerSymbol && gameboard[1][1].every === playerSymbol && gameboard[2][0].every === playerSymbol){
            return true;
        }
        else if(gameboard[0][0].every === playerSymbol && gameboard[1][0].every === playerSymbol && gameboard[2][0].every === playerSymbol){
            return true;
        }
        else if(gameboard[0][1].every === playerSymbol && gameboard[1][1].every === playerSymbol && gameboard[2][1].every === playerSymbol){
            return true;
        }
        else if(gameboard[0][2].every === playerSymbol && gameboard[1][2].every === playerSymbol && gameboard[2][2].every === playerSymbol){
            return true;
        }
        else{
            return false;
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