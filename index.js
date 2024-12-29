const Gameboard = (function(){
    const gameboard = [[".",".","."],[".",".","."],[".",".","."]]

    function checkWinner(playerSymbol){
        
    }

    function play(playerSymbol, row, column){
        gameboard[row][column] = playerSymbol
    }

    return {
        gameboard,
        play
    }
})();