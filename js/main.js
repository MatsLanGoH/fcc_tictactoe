/****
* EventListeners
****/
// Initialize array to hold event listeners
var t_listeners = [];

// Iterate over array and assign a listener to each element.
for (var i = 0; i < 9; i++) {
  var t_slot = document.getElementById('t0' + i);
  t_slot.addEventListener('click', function(){
    drawMove(this);
    checkGameState();
  })
  t_listeners.push(t_slot);
};



/************
*
* TicTacToe logic
*
************/
// Globals to keep track of game state.
var activePlayer = 'O';
var moveCount = 0;

/***
* Returns current player, and toggles to next player.
***/
function togglePlayer() {
  var currentMove = activePlayer;
  activePlayer = activePlayer == 'X' ? 'O' : 'X';
  // console.log(currentMove, activePlayer);
  return currentMove;
}

/***
* Checks if element is empty,
* then sets the element's content to active player.
***/
function drawMove(el) {
  if (el.innerHTML.length === 0) {
    el.appendChild(document.createTextNode(togglePlayer()));
    // console.log(el.innerHTML);
    moveCount++;
  }
}

/***
* Removes element's inner html text.
***/
function clearSlot(el) {
  el.innerHTML = '';
}

/***
* Clears board by invoking clearSlot for each slot of board.
***/
function clearBoard(board) {
  board.forEach(function(slot) {
    clearSlot(slot);
  });
  resetGameState();
}

/***
* Checks GameState.
***/
function checkGameState() {
  if (moveCount >= 9) {
    console.log('Game O-ver');
    clearBoard(t_listeners);
    console.log('Game Re-set!');
  }
}

function resetGameState() {
  activePlayer = 'O';
  moveCount = 0;
}
