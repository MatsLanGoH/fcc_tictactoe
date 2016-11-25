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
var slotValues = [];
for (var i = 0; i < 9; i++) {
  slotValues[i] = null;
}

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


function threeInARow(row) {
  // Get initial item and compare all other items against it.
  // If all items are equal, this will return true.
  console.log(row[0]);

  // If initial item not set return false.
  if (row[0] == null) {
    return false;
  }
  // If any item differs from initial, return false.
  for (var i = 1; i < row.length; i++) {
    if (row[i] != row[0]) {
      return false;
    }
  }
  console.log("All same");
  return true;
}

/***
* Checks GameState.
***/
function checkGameState() {
  // A player has scored three in a row.
  if (threeInARow(slotValues)) {
    console.log(activePlayer + ' has won');
  }
  // Stalemate game.
  if (moveCount >= 9) {
    console.log('Game O-ver');
    clearBoard(t_listeners);
    console.log('Game Re-set!');
  }
}

function resetGameState() {
  activePlayer = 'O';
  moveCount = 0;
  slotValues.forEach(function(index) {
    slotValues[index] = null;
  })
}
