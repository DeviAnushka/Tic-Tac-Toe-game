let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count =0;

let turnO = true; //playerX,playerY

// let arr = ["apple","banana","litchi"];

//2D array
// let arr2 = [["apple","litchi"],["potato","mushroom"],["pants","shirts"]];
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
          turnO = true;
          count =0;
          enableBoxes();
          msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        // console.log("X");
        if(turnO){//playerO
            box.innerText= "O";
            turnO = false;
            box.style.color = "blue";
        }
        else{//playerX
            box.innerText= "X";
            turnO = true;
            box.style.color = "yellow";
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count ===9 && !isWinner){
            Draw();
        }
        
        // checkWinner();
    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled =true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled =false;
        box.innerText = "";
    }
};


const showWinner = (winner) =>{
    msg.innerText = `Congratulations!Winner is Player ${winner}`;
    msg.style.fontSize = "40px";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const Draw = () => {
       msg.innerText = `Game was a Draw.`;
       msgContainer.classList.remove("hide");
       msg.style.fontSize = "40px";
       disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                // console.log("Winner",pos1Val);
                showWinner(pos1Val);
            }
        }
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        // );
        
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);