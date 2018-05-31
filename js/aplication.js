const timer = document.getElementById('timer');
let seconds = 0;
let minutes = 0;


window.addEventListener("load", function(){
    setGameTimer();
});


function setGameTimer(){
    console.log('start');
    timer.innerHTML = "00:00";
    setInterval(() => {
        seconds++;
        seconds < 10 ? seconds = "0" + seconds : seconds;

        if(seconds === 60){
            minutes++;
            minutes < 10 ? minutes = "0" + minutes : minutes;
            seconds = 0;
        } 

        timer.innerHTML = `${minutes}:${seconds}`;
    }, 1000);
}

function resetTimer(){
    
}
