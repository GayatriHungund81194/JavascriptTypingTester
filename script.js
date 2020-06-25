const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var timer = [0,0,0,0];
var interval;
var timerRunning = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZeros(time) {
  if (time<=9){
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currenttime = leadingZeros(timer[0]) + ":" + leadingZeros(timer[1]) + ":" + leadingZeros(timer[2]);
  theTimer.innerHTML = currenttime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
  timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textentered = testArea.value;
  let originTextMatch = originText.substring(0,textentered.length);
  if (textentered == originText){
    clearInterval(interval);
    testWrapper.style.borderColor = "#429890";
  } else if (textentered == originTextMatch) {
    testWrapper.style.borderColor = "#65CCf3";
  } else {
    testWrapper.style.borderColor = "#E95D0F";
  }

}

// Start the timer:
function start() {
  let textentered = testArea.value.length;
  if (textentered===0 && !timerRunning){
    timerRunning = true;
    interval = setInterval(runTimer,10);
  }
  console.log(textentered);
}

// Reset everything:
function reset() {
  //console.log("Reset button has been pressed!");
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;
  testArea.value = "";
  timer.innerHTML = "00:00:00";
  testArea.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);
