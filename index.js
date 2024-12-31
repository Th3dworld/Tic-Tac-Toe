//IIFE to run game
const Gameboard = (function(){
    let gameboard = [[".",".","."],[".",".","."],[".",".","."]]
    const playGrid = Array.from(document.getElementsByTagName('td'));
    let turn = 0;
    let round = 0;


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
        round++;
        turn = 0;
        setTimeout(() => {
            playGrid.forEach(elem => elem.textContent = "")
            gameboard = [[".",".","."],[".",".","."],[".",".","."]]
        }, 2000);
    }    

    function play(player1, player2){
        let playerSymbol;

        playGrid.forEach(elem => {
            elem.addEventListener('click', () => {

                //Determine turns and change sides
                if(round%2 === 0){
                    console.log("reached here")
                    console.log(turn)
                    if(turn%2 === 0){
                        playerSymbol = player1.symbol
                    }else{
                        playerSymbol = player2.symbol
                    }
                }else if(round%2 !== 0){
                    console.log("reached")
                    console.log(turn)
                    if(turn%2 === 0){
                        playerSymbol = player2.symbol
                    }else{
                        playerSymbol = player1.symbol
                    }
                }

                if(!checkWinner(player1.symbol) && !checkWinner(player2.symbol) && !checkTie(playerSymbol)){
                    const row = Number(elem.getAttribute("row"))
                    const col = Number(elem.getAttribute("col"))

                    //check if space is empty
                    if(gameboard[row][col] === "." && !checkWinner(playerSymbol)){
                        gameboard[row][col] = playerSymbol;
                        elem.textContent = playerSymbol;
                        turn++;
                        //check for winner or tie
                        if(checkWinner(playerSymbol)){
                            console.log(`${playerSymbol} wins!`);
                            resetBoard();
                        }
                        else if(checkTie()){
                            console.log(`It's a tie!`);
                            resetBoard();
                        }
                    }  
                }
            });
        });
    }

    return {
        gameboard,
        play,
        checkTie,
        checkWinner
    };
})();

//PLayer factory closure
const Player = function(sign){
    const symbol = sign;
    let points = 0;

    const getPoints = () => {points};
    const incrementsPoints = () => {++points};
    const resetPoints = () => {points = 0};

    return {symbol, getPoints, incrementsPoints, resetPoints};
}

//Run the game
const player1 = Player("x");
const player2 = Player("o");
Gameboard.play(player1, player2);

