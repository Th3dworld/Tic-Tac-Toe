//IIFE to run game
const Gameboard = (function(){
    let gameboard = [[".",".","."],[".",".","."],[".",".","."]]
    const playGrid = Array.from(document.getElementsByTagName('td'));


    function checkWinner(playerSymbol){
        if(gameboard[0].every(elem => elem === playerSymbol)){
            return true;
        }
        else if(gameboard[1].every(elem => elem === playerSymbol)){
            return true;
        }
        else if(gameboard[2].every(elem => elem === playerSymbol)){
            return true;
        }
        else if(gameboard[0][0] === playerSymbol && gameboard[1][1] === playerSymbol && gameboard[2][2] === playerSymbol){
            return true;
        }
        else if(gameboard[0][2] === playerSymbol && gameboard[1][1] === playerSymbol && gameboard[2][0] === playerSymbol){
            return true;
        }
        else if(gameboard[0][0] === playerSymbol && gameboard[1][0] === playerSymbol && gameboard[2][0] === playerSymbol){
            return true;
        }
        else if(gameboard[0][1] === playerSymbol && gameboard[1][1] === playerSymbol && gameboard[2][1] === playerSymbol){
            return true;
        }
        else if(gameboard[0][2] === playerSymbol && gameboard[1][2] === playerSymbol && gameboard[2][2] === playerSymbol){
            return true;
        }
        else{
            return false;
        }
    }

    function checkTie(){
        let state = []
        state.push(gameboard[0].every(elem => elem !== "."))
        state.push(gameboard[1].every(elem => elem !== "."))
        state.push(gameboard[2].every(elem => elem !== "."))

        return state.every(elem => elem === true);
    }

    function resetBoard(){
        gameboard = [[".",".","."],[".",".","."],[".",".","."]]
        setTimeout(() => {
            playGrid.forEach(elem => elem.textContent = "")
        }, 2000);
        
    }    

    function play(playerSymbol){
        playGrid.forEach(elem => {
            elem.addEventListener('click', () => {
                if(!checkWinner(playerSymbol) && !checkTie(playerSymbol)){
                    const row = Number(elem.getAttribute("row"))
                    const col = Number(elem.getAttribute("col"))
                    console.log(`${row}, ${col}`);
                    //check if space is empty
                    if(gameboard[row][col] === "."){
                        gameboard[row][col] = playerSymbol;
                        elem.textContent = playerSymbol;
                    }
                    
                }
                //check for winner or tie
                if(checkWinner(playerSymbol)){
                    console.log(`${playerSymbol} wins!`);
                    resetBoard();
                }
                else if(checkTie()){
                    console.log(`It's a tie!`);
                    resetBoard();
                }
            });
        });
    }

    return {
        gameboard,
        play
    };
})();

//PLayer factory closure
const Player = function(sign){
    const symbol = sign;
    let points = 0;

    const getPoints = () => {points};
    const incrementsPoints = () => {++points};

    return {symbol, getPoints, incrementsPoints};
}

//Test game
const player1 = Player("x")
const player2 = Player("o")
Gameboard.play(player1.symbol)
// Gameboard.play(player1.symbol, 1, 0)
// Gameboard.play(player2.symbol, 2, 0)
// Gameboard.play(player2.symbol, 0, 1)
// Gameboard.play(player1.symbol, 1, 1)
// Gameboard.play(player2.symbol, 2, 1)
// Gameboard.play(player1.symbol, 0, 2)
// Gameboard.play(player2.symbol, 1, 2)
// Gameboard.play(player2.symbol, 2, 2)

