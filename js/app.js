const timer = document.getElementById('timer');
let seconds = 0;
let minutes = 0;
let time;

const cards = document.getElementsByClassName("card");


window.addEventListener("load", function(){
    setGameTimer();
    resetGameTimer();
    displayCards();
});


function setGameTimer(){
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

function resetGameTimer(){
    document.getElementsByClassName("restart")[0].addEventListener("click", () => {
        clearInterval(time);
        seconds = 0;
        minutes = 0;
        setGameTimer();
    })    
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCards() {
    const shuffledCards = shuffle([...cards]);
    const deck = document.getElementsByClassName("deck")[0];
    deck.innerHTML = "";
    [...shuffledCards].map((e) => {
        console.log(e);
        e.classList.remove("show", "open", "match", "disabled");
        deck.appendChild(e);       
    });
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
