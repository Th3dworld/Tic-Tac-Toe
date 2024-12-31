//IIFE to run game
const Gameboard = (function(){

    //Declare Variables
    const player1Score = document.querySelector("#contestant-1 > .score");
    const player2Score = document.querySelector("#contestant-2 > .score");
    const displayWinner = document.getElementById("display-winner");
    const playGrid = Array.from(document.getElementsByTagName('td'));
    let gameboard = [[".",".","."],[".",".","."],[".",".","."]]
    let player1;
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
            displayWinner.textContent = ``;
        }, 2000);
    }    

    function play(player1, player2){
        let player;

        //Initialize scores
        player1.resetPoints();
        player2.resetPoints();
        player1Score.textContent = player1.getPoints();
        player2Score.textContent = player2.getPoints();

        playGrid.forEach(elem => {
            elem.addEventListener('click', () => {

                

                //Determine turns and change sides
                if(round%2 === 0){
                    console.log("reached here")
                    console.log(turn)
                    if(turn%2 === 0){
                        player = player1
                    }else{
                        player = player2
                    }
                }else if(round%2 !== 0){
                    console.log("reached")
                    console.log(turn)
                    if(turn%2 === 0){
                        player = player2
                    }else{
                        player = player1
                    }
                }

                if(!checkWinner(player1.symbol) && !checkWinner(player2.symbol) && !checkTie(player.symbol)){
                    const row = Number(elem.getAttribute("row"))
                    const col = Number(elem.getAttribute("col"))

                    //check if space is empty
                    if(gameboard[row][col] === "." && !checkWinner(player.symbol)){
                        gameboard[row][col] = player.symbol;
                        elem.textContent = player.symbol;
                        turn++;

                        //check for winner or tie
                        if(checkWinner(player.symbol)){
                            displayWinner.textContent = `${player.playerName} wins!`;
                            player.incrementsPoints()

                            resetBoard();
                        }
                        else if(checkTie()){
                            displayWinner.textContent = `It's a tie!`;
                            resetBoard();
                        }
                        
                        //update scores after each round
                        player1Score.textContent = player1.getPoints();
                        player2Score.textContent = player2.getPoints();
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

    const getPoints = () => String(points);
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
const resetBtn = document.getElementById("reset-button")
let player2;

function runGame(){
    player1 = Player("x", player1Name.textContent);
    player2 = Player("o", player2Name.textContent);
    Gameboard.play(player1, player2);
}

//Run Modal operations
dialog.showModal();

submitBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    player1Name.textContent = player1input.value;
    player2Name.textContent = player2input.value;
    dialog.close()
});

dialog.addEventListener("close", ()=>{
    //Reset the values
    player1input.value = ""
    player2input.value = ""
    //Run the game
    runGame();
});

resetBtn.addEventListener("click", ()=>{
    dialog.showModal();
});

//TODO
/*
Show whose turn it is
Reset score with reset
*/



