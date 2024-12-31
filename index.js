//IIFE to run game
const Gameboard = (function(){

    //Declare Variables
    let gameboard = [[".",".","."],[".",".","."],[".",".","."]]
    const playGrid = Array.from(document.getElementsByTagName('td'));
    let turn = 0;
    let round = 0;

    //Check for winner or tie
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
const Player = function(sign, name){
    const symbol = sign;
    let points = 0;
    let playerName = name;

    const getPoints = () => {points};
    const incrementsPoints = () => {++points};
    const resetPoints = () => {points = 0};

    return {symbol, playerName, getPoints, incrementsPoints, resetPoints};
}

//Declare Variables
const dialog = document.querySelector("dialog");
const submitBtn = document.getElementById("submit-btn");
const player1input = document.querySelector("#player-1")
const player2input = document.querySelector("#player-2")
const player1Name = document.querySelector("#contestant-1 > .name");
const player2Name = document.querySelector("#contestant-2 > .name");
let player1Score = document.querySelector("#contestant-1 > .score");
let player2Score = document.querySelector("#contestant-2 > .score");

//Run Modal operations
dialog.showModal();

submitBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    player1Name.textContent = player1input.value;
    player2Name.textContent = player2input.value;
    player1Score.textContent = "0";
    player2Score.textContent = "0";


    dialog.close()
});

dialog.addEventListener("close", ()=>{
    //Reset the values
    player1input.value = ""
    player2input.value = ""
});

//Run the game
const player1 = Player("x", player1Name);
const player2 = Player("o", player2Name);
Gameboard.play(player1, player2);

