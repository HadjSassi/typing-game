let TIME_LIMIT = 60;
// Seed the PRNG with a fixed seed value (e.g., 12345)
const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1; // Months are zero-indexed, so adding 1
const day = now.getDate();
const hour = now.getHours();
const minute = now.getMinutes();

const timestamp = parseInt(`${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`);

const seedValue = timestamp;


let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
// let btnStart = document.getElementById("btnStart");
let btnEasy = document.getElementById("btnEasy");
let btnMedium = document.getElementById("btnMedium");
let btnHard = document.getElementById("btnHard");
let btnRandom = document.getElementById("btnRandom");
let score = document.getElementById("score");
let scoreValue = document.getElementById("score0");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
let timer_group = document.querySelector(".timer");
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let timer = null;

input_area.onpaste = function () {
  return false;
}
const rng = new Math.seedrandom(seedValue);

function updateQuote() {
  if (quotes_array.length === 0) {
    // All phrases have been used, reset the array
    quotes_array = original_quotes_array.slice();
  }

  quote_text.textContent = null;
  const randomIndex = Math.floor(rng()  * quotes_array.length);
  current_quote = quotes_array[randomIndex];

  // Remove the selected phrase from the array
  quotes_array.splice(randomIndex, 1);
  // Update the main quotes_array only when quotes_array is empty
  if (quotes_array.length === 0) {
    quotes_array = [];
  }

  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span');
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  });
}
function processCurrentText() {

  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // incorrect characters
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy = Math.round(accuracyVal)
  accuracy_text.textContent = accuracy;

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length === current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}
function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}
function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Thank you For playing TYPO 1.0, If you want to replay refresh the page.";

  // display restart button
  score.style.display = "block";
  scoreValue.style.display = "block";
  // calculate wpm
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
  const calculatedScore = calculateScore(wpm, accuracy);
  // update wpm text
  wpm_text.textContent = wpm;
  scoreValue.textContent = calculatedScore.toFixed(2); // Display the score with 2 decimal places

  // display wpm
  wpm_group.style.display = "block";
  timer_group.style.display = "none";

}

function calculateScore(wpm, accuracy) {
  // Normalize accuracy to a scale between 0 and 1
  const normalizedAccuracy = accuracy;

  // Calculate the weighted score components
  const wpmScore = (wpm) * 0.2;  // Normalize WPM to a scale between 0 and 60
  const accuracyScore = normalizedAccuracy * 0.5;  // Scale accuracy to a max of 20

  return wpmScore + accuracyScore ;
}
// Function to combine arrays
function combineArrays(arrays) {
  return arrays.reduce((combined, arr) => combined.concat(arr), []);
}
function selectDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy':
      quotes_array = [...quotes_easy];
      break;
    case 'medium':
      quotes_array = [...quotes_medium];
      break;
    case 'hard':
      quotes_array = [...quotes_hard];
      break;
    case 'random':
      quotes_array = combineArrays([quotes_easy, quotes_medium, quotes_hard]);
      break;
    default:
      quotes_array = combineArrays([quotes_easy, quotes_medium, quotes_hard]);
      break;
  }

  startGame();
}
function startGame() {
  btnEasy.style.display="none";
  btnMedium.style.display="none";
  btnHard.style.display="none";
  btnRandom.style.display="none";
  timer_group.style.display = "block";
  quote_text.style.display="block";
  input_area.focus();
  resetValues();
  updateQuote();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}
function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  score.style.display="none";
  scoreValue.style.display = "none";
  wpm_group.style.display = "none";
  timer_group.style.display = "block";
}
