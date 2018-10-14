let game = new Game();
let round;
let puzzle;
let wheel;

const playerArray = [];
let playerArrayIndex = 0;

$('.start-button').on('click', () => {
  game = new Game();
  let gamePlayers = game.init();
  const nameKeys = Object.keys(gamePlayers);
  nameKeys.forEach(key => {
    let newPlayer = new Player(key);
    playerArray.push(newPlayer);
  });
  domUpdates.displayNames();
  round = game.startRound();
  puzzle = round.generatePuzzle();
  puzzle.populateBoard();
  wheel = round.generateWheelValue();
});



$('.quit').on('click', () => {
  game.quitGame();
  playerArrayIndex = 0;
});

$('.spin-button').on('click', game.setUpWheel);

$('.spin-text').on('click', spinWheel);

// $('.solve-button').on('click', game.endGame);


// Make this a method of wheel
function spinWheel() {
  $('.wheel-circle').toggleClass('wheel-spin');
  setTimeout(game.tearDownWheel, 5500);
  wheel.grabSpinValue();
}


// $('.keyboard-section').on('click', () => {
//   let currentTurn = playerArray[playerArrayIndex];
//   let currentGuess = $(event.target).text();
//   let isGuessCorrect = puzzle.checkGuess(currentGuess);
//   if ($(event.target).hasClass('disabled') || $(event.target).parent().hasClass('disabled')) {
//     return;
//   } else if (isGuessCorrect) {
//     currentTurn.guessCorrectLetter(puzzle.numberCorrect, wheel.currentValue);
//     puzzle.countCorrectLetters(currentGuess);
//   } else {
//     playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
//     game.endRound(playerArray);
//   }
//   if(['A', 'E', 'I', 'O', 'U'].includes($(event.target).text()) && $(event.target).hasClass('active-vowel')) {
//     currentTurn.buyVowel();
//     domUpdates.disableGuessedVowel(event);
//   } else if ($(event.target).hasClass('disabled')) {
//     return;
//   } else {
//     domUpdates.disableGuessedLetter(event);
//   }
// });

$('.keyboard-section').on('click', (event) => {
  let currentTurn = playerArray[playerArrayIndex];
  let currentGuess = $(event.target).text();
  let isGuessCorrect = puzzle.checkGuess(currentGuess);
  if (['A', 'E', 'I', 'O', 'U'].includes($(event.target).text())) {
    puzzle.checkIfVowelCorrect(currentGuess, currentTurn, event);
    return;
  } else {
    let isEnabled = puzzle.checkIfConsonantEnabled(event);
    if (isEnabled && isGuessCorrect) {
      puzzle.countCorrectLetters(currentGuess);
      currentTurn.guessCorrectLetter(puzzle.numberCorrect, wheel.currentValue);
    }
  }
});


$('.vowel-button').on('click', () => {
  let currentTurn = playerArray[playerArrayIndex];
  if (currentTurn.wallet < 100) {
    alert('You do not have enough money, please spin the wheel');
    return;
  } else {
    domUpdates.highlightVowels();
  }
});



