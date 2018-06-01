const timer = document.getElementById('timer');
let seconds = 0;
let minutes = 0;
let time;


window.addEventListener("load", function(){
    setGameTimer();
    resetGameTimer();
});


function setGameTimer(){
    timer.innerHTML = "0 mins 0 sec";
    time = setInterval(() => {
        seconds++;
        
        if(seconds === 60){
            minutes++;
            seconds = 0;
        } 

        ///minutes < 10 ? minutes = "0" + minutes : minutes;

        timer.innerHTML = `${minutes} mins ${seconds} sec`;
    }, 1000);
}

function resetGameTimer(){
    document.getElementsByClassName("restart")[0].addEventListener("click", () => {
        console.log("test");
        clearInterval(time);
        seconds = 0;
        minutes = 0;
        setGameTimer();
    })    
}

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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
