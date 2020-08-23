const word = document.getElementById('word'); 
const text = document.getElementById('text'); 
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsForm = document.getElementById('settings-form');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Init word
let randomWord; //let is limited to a block, var is globaldeclaration

// Init score
let score = 0;

// Init time
let time = 10;

let difficulty;
// Focus on text on start
text.focus(); /*similar to autofocus in html, used to set the focus on start to a text*/

// Start counting down
const timeInterval = setInterval(updateTime, 1000); //1000 is 1000 millisec= 1sec
/*The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).
The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.*/
// Generate random word from array

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
/*Math.random() always returns a number lower than 1
words.length is number of elements in the words list
(Math.random() * words.length) will give some value, treated as 'x' in the next line
Math.floor(x) returns the value of x rounded down to its nearest integer
*/


// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
/*The reload() method is used to reload the current document.
The reload() method does the same as the reload button in your browser*/

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;
/*The input event triggers every time after a value is modified by the user.
e is short for event
Target is the selected element*/


  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear the text in the placeholder
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});


// Settings select
/*The change event triggers when the element has finished changing 
for non-text elements, it triggers right after the selection changes*/
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
