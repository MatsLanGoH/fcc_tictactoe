/****
* EventListeners
****/
// Initialize array to hold event listeners
var t_listeners = [];

// Iterate over array and assign a listener to each element.
var t_slots = document.getElementsByClassName('ttt-slot');
for (var i = 0; i < t_slots.length; i++) {
  t_slots[i].addEventListener('click', function() {
    var move = togglePlayer();
    console.log(parseElementToMatrix(this.id));
    drawMove(this, move);
    checkGameState();
  });
  t_listeners.push(t_slots[i]);
}


/************
*
* TicTacToe logic
*
************/
// Globals to keep track of game state.
var activePlayer = 'O';
var moveCount = 0;
var tttMatrix = initializeMatrix();


/***
* Initialize a 2d matrix (3*3)
* and set each item to null
***/
function initializeMatrix() {
  var matrix = [];
  for (var i = 0; i < 3; i++) {
    matrix.push(new Array());
  }

  matrix.forEach(function(row) {
      for (var i = 0; i < 3; i++) {
        row.push([null]);
      }
  });

  return matrix;
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
function drawMove(el, move) {
  if (el.innerHTML.length === 0) {
    el.appendChild(document.createTextNode(move));
    moveCount++;
  }
}


function parseElementToMatrix(id) {
    var position = [];
    position.push(parseInt(id[1]));
    position.push(parseInt(id[2]));
    return position;
}


function addMoveToMatrix() {

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
* Checks if items in a row are equal.
***/
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
  if (threeInARow(tttMatrix)) {
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
  initializeMatrix();
}
