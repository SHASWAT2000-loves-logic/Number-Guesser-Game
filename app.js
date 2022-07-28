//storing the minimum value, maximum value, number of guesses and the right answer
let minNum = 1,
  maxNum = 10,
  noOfGuesses = 3,
  rightAnswer = getWinningNumber(minNum, maxNum);

const minValue = document.querySelector(".min"), //for minimum value
  maxValue = document.querySelector(".max"), //for maximum value
  checkAnswer = document.querySelector("#submit_btn"), //for checking answer
  userAnswer = document.querySelector("#user_input"), //storing user's answer
  message = document.querySelector(".message"), //for displaying message to user
  gameWrapper = document.querySelector("#game"); //the game wrapper that wraps the whole game
// Setting the minimum and maximum value
minValue.textContent = minNum;
maxValue.textContent = maxNum;

// for restarting the game after the user has won/lost
gameWrapper.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("play-again")) {
    location.reload();
  }
});
// Click event for checking user's guess
checkAnswer.addEventListener("click", function () {
  // Invalid input
  if (
    userAnswer.value > maxNum ||
    userAnswer.value < minNum ||
    userAnswer.value == ""
  ) {
    showMessage(`Please enter a number between ${minNum} and ${maxNum}`, "red");
    userAnswer.value = "";
  } else {
    // Game winning condition
    if (userAnswer.value == rightAnswer) {
      showMessage(`${userAnswer.value} is correct, YOU WIN!`, "green");
      userAnswer.disabled = true;
      checkAnswer.textContent = "Play Again";
      checkAnswer.classList.add("play-again");
    } else {
      noOfGuesses -= 1;
      // Game lost, no guesses left
      if (noOfGuesses == 0) {
        showMessage(
          `Game Over, you lost. The correct number was ${rightAnswer}`
        );
        userAnswer.disabled = true;
        checkAnswer.textContent = "Play Again";
        checkAnswer.classList.add("play-again");
      }
      // Wrong guess, but guesses are left
      else {
        showMessage(
          `${userAnswer.value} is not correct, ${noOfGuesses} guesses are left`,
          "red"
        );
        userAnswer.value = "";
      }
    }
  }
});

// Displays message depending on whether the user won, lost, or has guesses left to get the right answer
function showMessage(displayMessage, color) {
  message.textContent = displayMessage;
  message.style.color = color;
  userAnswer.style.borderColor = color;
}

// Used to calculate the random number between the range of min and max that will be the actual right answer
function getWinningNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
