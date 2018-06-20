//variales describe timer
const timer = document.getElementById('timer');
let seconds = 0;
let minutes = 0;
let time;

//variables describe set of cards
const cards = document.getElementsByClassName("card");
let shuffledCards = [...cards];


//variables descirbe moves and stars
const stars = document.querySelectorAll(".fa-star");
const starsList = document.querySelector(".stars");

let movesCounter = document.querySelector(".moves");
let moves = 0;

let scores = 3;

//variables describe cards after moves
let matchedCards = 0;
const openCards = document.getElementsByClassName("open");


//variable describe place where cards are visible
const deck = document.querySelector(".deck");


//start game after window load or refreash
window.addEventListener("load", function(){
    initGame();
});


//event listener cause game restart
document.querySelector(".restart").addEventListener("click", () => { 
    initGame();
});

checkCards();


function initGame(){
    //clear all moves
    moves = 0;
    movesCounter.innerHTML = "0";
    
    //clear matched cards counter
    matchedCards = 0;

    //clear interval
    clearInterval(time);

    //shuffle cards
    shuffledCards = shuffle([...cards]);
    shuffleCards();

    //make all stars visible
    [1,2].map(e => {
        stars[e].style.display = ""
    });

    //set timer
    timer.innerHTML = "0 mins 0 sec";
    setGameTimer();
     
}

//function ro shuffle cards
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//function re-placing the card on the board, remove all cards classes
function shuffleCards() {
    deck.innerHTML = "";
    [...shuffledCards].map(e => {        
        e.classList.remove("show", "open", "match", "disabled");
        deck.appendChild(e);       
    });
}

//funacton to set game timer
function setGameTimer(){
    seconds = 0;
    minutes = 0;
    time = setInterval(() => {
        seconds++;
        
        if(seconds === 60){
            minutes++;
            seconds = 0;
        } 

        timer.innerHTML = `${minutes} mins ${seconds} sec`;
    }, 1000);
}

//function which add event listener CLICK to each card
function checkCards(){
    [...shuffledCards].map(card => {       
         card.addEventListener("click", function(e){                  
            if(openCards.length < 2){
                this.classList.toggle("open");
                this.classList.toggle("show");
                this.classList.toggle("disabled");
            }            
            checkMatch();
        })       
    });
}

//function to check if cards matched
function checkMatch() {
    if(openCards.length === 2){
        moves++;
        movesCounter.innerHTML = moves;
        if(openCards[0].innerHTML === openCards[1].innerHTML){
            [...openCards].map(e => {
                e.classList.remove("open", "show")
                e.classList.add("match");
            });
            checkResult();
        }else{
            setTimeout(() => [...openCards].map(e => {
                e.classList.remove("open", "show", "disabled");      
            }), 1000);            
        }
        
    }
    countMoves(moves);
}
//function to check if all cards matched
function checkResult(){
    matchedCards += 1;

    if(matchedCards === 8){  
        clearInterval(time); 
        swal({
            title: "Congratulations !!!",
            text: sessionStorage.getItem("moves") === null ? `You won with time: ${minutes} min ${seconds} sec \nand ${scores} scores (${moves} moves)` : `You won with time: ${minutes} min ${seconds} sec \nand ${scores} scores (${moves} moves)! \n Last time you had ${sessionStorage.getItem("moves")} moves`,
            type: "success",
            confirmButtonText: "Play again!"
        }).then(function(isConfirm) {
            if (isConfirm) {
               initGame();
            }     
        })

        sessionStorage.setItem("moves", moves);
    }
}

//function to count moves during the game
function countMoves(moves){
    if(moves === 10){
        scores = 2;
        stars[2].style.display = "none";
    }else if(moves === 15){
        scores = 1;
        stars[1].style.display = "none";
    }
}




