const timer = document.getElementById('timer');
let seconds = 0;
let minutes = 0;
let time;
let scores = 3;


const cards = document.getElementsByClassName("card");
const shuffledCards = shuffle([...cards]);
const deck = document.querySelector(".deck");
const starsList = document.querySelector(".stars");

let movesCounter = document.querySelector(".moves");
let moves = 0;

const openCards = document.getElementsByClassName("open");

const stars = document.querySelectorAll(".fa-star");

let matchedCards = 0;



window.addEventListener("load", function(){
    initGame();
});

function initGame(){
    deck.innerHTML = "";
    shuffleCards();
    checkCards();
    setGameTimer();
    document.querySelector(".restart").addEventListener("click", () => { 
        resetGame();
    })  
}

function shuffleCards() {
    movesCounter.innerHTML = moves;
    [...shuffledCards].map(e => {
        e.classList.remove("show", "open", "match");
        deck.appendChild(e);       
    });
}

function checkCards(){
    [...shuffledCards].map(card => {
        card.addEventListener("click", function(e){
            e.preventDefault()
            if(openCards.length < 2){
                this.classList.toggle("open");
                this.classList.toggle("show");
                checkMatch(e);
            }            
        })       
    });
}

function uncheckedCards(){
    [...shuffledCards].map(card => {
        card.removeEventListener("click", function(e){
            if(openCards.length < 2){
                this.classList.toggle("open");
                this.classList.toggle("show");
                checkMatch(e);
            }            
        })       
    });
}

function checkMatch(evt) {
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
                e.classList.remove("open", "show");      
            }), 1000);            
        }
        
    }
    countMoves(moves);
}

function checkResult(){
    matchedCards += 1;

    if(matchedCards === 8){   
        console.log(scores);
        swal({
            title: "Congratulations !!!",
            text: `You won with time: ${minutes} min ${seconds} sec \nand ${scores} scores!`,
            type: "success",
            confirmButtonText: "Play again!"
        }).then(function(isConfirm) {
            if (isConfirm) {
               resetGame();
            }     
        })
    }
}

function setGameTimer(){
    seconds = 0;
    minutes = 0;
    timer.innerHTML = "0 mins 0 sec";
    time = setInterval(() => {
        seconds++;
        
        if(seconds === 60){
            minutes++;
            seconds = 0;
        } 

        timer.innerHTML = `${minutes} mins ${seconds} sec`;
    }, 1000);
}

function resetGame(){
    cosnole.log("reset");
        uncheckedCards()
        moves = 0;
        shuffleCards();
        clearInterval(time);
        setGameTimer(); 
        stars[1].style.display = ""; 
        stars[2].style.display = "";
}

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

function countMoves(moves){
    if(moves === 10){
        scores = 2;
        stars[2].style.display = "none";
    }else if(moves === 15){
        scores = 1;
        stars[1].style.display = "none";
    }
}

