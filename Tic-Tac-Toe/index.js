var boxes = document.querySelectorAll('.box'); // get all 9 boxes by classname

var message = document.getElementById('message'); // get message box

message.innerHTML = "Player X's Turn..."; // initialize message

var gameComplete = false;

var letter = 'X'; // initializing the 'X's and 'O's

var turnCounter = 0; // keeps track of what turn nuber it is

//- sounds -//
var cheer = new Audio('audio/cheer.mp3');
var soundX = new Audio('audio/soundX.mp3');
var soundO = new Audio('audio/soundO.mp3');
var drawSound = new Audio('audio/drawSound.mp3');
var replay = new Audio('audio/replay.mp3');


//- Increment Turn Number -//

function incrementTurnCounter() {
    turnCounter++;
}

//- Check all 8 ways to get 3 X's or O's in a row -//

function checkforWinner() {
    if (turnCounter > 4) {
        threeInARow(boxes[0].innerHTML, boxes[1].innerHTML, boxes[2].innerHTML, boxes[0].id, boxes[1].id, boxes[2].id);

		threeInARow(boxes[3].innerHTML, boxes[4].innerHTML, boxes[5].innerHTML, boxes[3].id, boxes[4].id, boxes[5].id);

		threeInARow(boxes[6].innerHTML, boxes[7].innerHTML, boxes[8].innerHTML, boxes[6].id, boxes[7].id, boxes[8].id);

		threeInARow(boxes[0].innerHTML, boxes[3].innerHTML, boxes[6].innerHTML, boxes[0].id, boxes[3].id, boxes[6].id);

		threeInARow(boxes[1].innerHTML, boxes[4].innerHTML, boxes[7].innerHTML, boxes[1].id, boxes[4].id, boxes[7].id);

		threeInARow(boxes[2].innerHTML, boxes[5].innerHTML, boxes[8].innerHTML, boxes[2].id, boxes[5].id, boxes[8].id);

		threeInARow(boxes[0].innerHTML, boxes[4].innerHTML, boxes[8].innerHTML, boxes[0].id, boxes[4].id, boxes[8].id);

		threeInARow(boxes[2].innerHTML, boxes[4].innerHTML, boxes[6].innerHTML, boxes[2].id, boxes[4].id, boxes[6].id);
	}
}

//- Indicate to both players who has won and how -//

function threeInARow(a, b, c, d, e, f) { 
	if ((a.length == 1) && (a == b) && (b == c)) {
        gameComplete = true;
        
		document.getElementById(d).style.color = '#779ECB';

		document.getElementById(e).style.color = '#779ECB';

		document.getElementById(f).style.color = '#779ECB';

		message.innerHTML = a + " wins!";
        message.style.color = '#779ECB';
		
        //play winning sound
        setTimeout(() => { // play sound when win
            cheer.play();
        }, 300);
        
        // call reset function
        reset();
	}
}

//- Add click event listener to all 9 boxes & indicate who's turn it is -//

function play() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', function() {

            if (gameComplete == false) { // == evalute
                incrementTurnCounter();
    
                if (turnCounter % 2 == 0) { 
                    letter = 'O';
                    this.innerHTML = letter;
                    soundO.play(); // play sound when O is placed
                    message.innerHTML = "Player X's Turn..."; // player's turn alternates when turn number is odd/even
                }
    
                else {
                    letter = 'X';
                    this.innerHTML = letter;
                    soundX.play(); // play sound when X is placed
                    message.innerHTML = "Player O's Turn...";
                }

                checkforWinner(); // call function to check if X or O has won

                if ((turnCounter == 9) && (gameComplete == false)) { // if no-one has won and all boxes have been clicked
                    gameComplete = true; // set
                    message.innerHTML = "It's a DRAW!";
                    message.style.color = '#779ECB';

                    setTimeout(() => { // play sound when draw
                        drawSound.play();
                    }, 300);
                     
                    reset(); // play again
                }
            }
        }, {once: true}); // ensures each space can only be clicked once
    }
}

play(); // call function

//- Add a reset button with a click event listener that resets the game board for a new game -//

function reset() {
    var resetButton = document.createElement('button'); // create button
    var reset = document.getElementById('reset'); // get reset div
    reset.appendChild(resetButton); // add button to reset div
    resetButton.innerHTML = 'Play Again'; // button text
    
    resetButton.addEventListener('click', function() { // add click event listener to button that reloads page
        replay.play();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    });
    
    //- Ensure players cannot click on game board after game is over -//

    for (let i = 0; i < boxes.length; i++) {

        // click event listener to boxes so contents stay the same & indicate to players that the game is over if clicked
        boxes[i].addEventListener('click', function() {
            this.innerHTML;
            message.innerHTML = "Game Over! Click 'Play Again' for a Rematch";
            message.style.color = 'black';
        });
    }
}





