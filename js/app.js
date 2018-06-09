const timer = document.getElementById('timer');
let seconds = 0;
let minutes = 0;
let time;


const cards = document.getElementsByClassName("card");
const shuffledCards = shuffle([...cards]);
const deck = document.querySelector(".deck");
const resultTimer = document.querySelector(".result-time");
const winInfo = document.querySelector(".win-info");
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
    console.log("test");
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
        winInfo.style.display = "block";
        resultTimer.innerHTML = `${minutes} min ${seconds} sec`; 
   
        document.querySelector(".body").appendChild(starsList.cloneNode(true));        

        document.querySelector("button").addEventListener("click", function(){
            resetGame();
            winInfo.style.display = "none";
            
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
    stars[2].style.display = "none";
   }else if(moves === 15){
    stars[1].style.display = "none";
   }
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
