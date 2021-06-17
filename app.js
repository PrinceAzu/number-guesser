// Game Values
let min = 1,
    max = 10,
    winingNum = randomNum(min, max),
    guessesLeft = 3;

// UI variables
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message =  document.querySelector(".message");


// Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

// Get random number
function randomNum(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min);
}

// Set message
const setMessage = (msg, color) => {
    message.style.color = color
    message.textContent = msg;
}

const gameOver = (won, msg) => {
    let color;
    won === true ? color = "green" : color = "red";

    // Disable Input
    guessInput.disabled = true; 
    // Change border color
    guessInput.style.borderColor = color; 
    // Set text color
    message.style.color = color;

    setMessage(msg);

    // Play again
     guessBtn.value = "Play Again";
     guessBtn.className += "play-again";
}

// EVENT LISTENERS: 

// Play again listener
game.addEventListener("mousedown", (e) => {
    if (e.target.className === "play-again") {
        window.location.reload();
    }
});


// Listen for guess
guessBtn.addEventListener("click", () => {
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }

    // Check if won
    if (guess === winingNum) {
        gameOver(true, `Hooray!, ${winingNum} is correct`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winingNum}`);
        } else {
            // Game continues - answer wrong
            guessInput.style.borderColor = "red"; // Change border color

            // Clear input
            guessInput.value = "";
            setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`, "red") // Set message
        }
    }
});
