const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".player-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// function to initialize the game



function initGame()
{
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    //updtating on UI
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList = `box box${index+1}`
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player ${currentPlayer}`;

}
initGame();

function swapTurn()
{
    if(currentPlayer==="X")
    {
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player ${currentPlayer}`;
}



function checkGameOver()
{
    let answer ="";

    //all three boxes should be non empty and equal
    winningPositions.forEach((position)=>{
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if(gameGrid[position[0]] === "X") 
                answer = "X";
            else {
                answer = "O";
            } 
                

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
});

if(answer!=="")
{
    //it mean we have awinner
    gameInfo.innerText = `Winner Player ${answer}`;
    newGameBtn.classList.add("active");
}

//to check if game is tied

let count = 0;
 gameGrid.forEach((box)=>{
    if(box!=="")
    {
        count++;
    }
 });
 if(count===9)
 {
    gameInfo.innerText="Game Tied";
    newGameBtn.classList.add("active");
 }

}
function clickHandler(index)
{
    if(gameGrid[index]==="")
    {
        gameGrid[index]=currentPlayer;
        boxes[index].innerHTML = currentPlayer;
        boxes[index].style.pointerEvents="none";

        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{

        clickHandler(index);
    })
});

newGameBtn.addEventListener("click",initGame);
