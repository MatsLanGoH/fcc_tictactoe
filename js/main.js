/****
* EventListeners
****/
// Initialize array to hold event listeners
var t_listeners = [];

// Iterate over array and assign a listener to each element.
var t_slots = document.getElementsByClassName('ttt-slot');
for (var i = 0; i < t_slots.length; i++) {
  t_slots[i].addEventListener('click', function() {
    var move = togglePlayer(),
        [x, y] = parseElementToCoords(this.id);
    tttGrid[x][y] = move;
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
var tttGrid = initializeGrid();




/*******************
* HELPER FUNCTIONS *
*******************/

/***
* Initialize a 2d grid (3*3) and set each item to null
***/
function initializeGrid() {
  var grid = [];
  // Initialize rows
  for (var i = 0; i < 3; i++) {
    grid.push(new Array());
  }

  // Initialize columns
  grid.forEach(function(row) {
      for (var i = 0; i < 3; i++) {
        row.push([null]);
      }
  });

  return grid;
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


/***
* Translates div id into coordinates for 2d grid
***/
function parseElementToCoords(id) {
    var position = [];
    position.push(parseInt(id[1]));
    position.push(parseInt(id[2]));
    return position;
}


/***
* Adds value to grid at given coordinates
***/
function addMoveToGrid(grid, value, x, y) {
  grid[x][y] = value;
  return;
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



/**********
* GRID CHECK HELPER FUNCTIONS
* TODO: There is potential for refactoring here.
**********/

/***
* Checks if items in a row are equal.
***/
function threeInARow(grid, ri) {
  // ri = row index
  // Get initial item and compare all other items against it.
  // If all items are equal, this will return true.
  console.log(grid);

  // If initial item not set return false.
  if (grid[ri][0] == null) {
    return false;
  }
  // If any item differs from initial, return false.
  for (var i = 1; i < grid.length; i++) {
    if (grid[ri][i] != grid[ri][0]) {
      return false;
    }
  }
  console.log("All same. Row.");
  return grid[ri][0];
}


/***
* Checks if items in a column are equal.
***/
function threeInAColumn(grid, ci) {
  // ci = column index
  if (grid[0][ci] == null) {
    return false;
  }

  for (var i = 1; i < grid.length; i++) {
    if (grid[i][ci] != grid[0][ci]) {
      return false;
    }
  }
  console.log("All same. Column.");
  return grid[0][ci];
}


/***
* Checks if items in the UL-LR diagonal are equal.
***/
function threeInADiagonal(grid) {
  // Check upper left diagonal first
  if (grid[0][0] == null) {
    return false;
  }

  for (var i = 0; i < grid.length; i++) {
    if (grid[i][i] != grid[0][0]) {
      return false;
    }
  }
  console.log("All same. UL to LR.");
  return grid[0][0];
}



/***
* Checks if items in the LL-UR diagonal are equal.
***/
function threeInAReverseDiagonal(grid) {
  var x = grid.length - 1;
  if (grid[0][x] == null) {
    return false;
  }

  for (var i = 0; i < grid.length; i++) {
    if (grid[x - i][i] != grid[0][x]) {
      return false;
    }
  }
  console.log("All same. LL to UR.");
  return grid[0][x];
}


/******
* Invokes all helper check functions on a grid
* to determine if somebody has won.
*******/
function threeInAGrid(grid) {
  // Do the rows and columns first.
  for (var i = 0; i < grid.length; i++) {
    if (threeInARow(grid, i)) return true;
    if (threeInAColumn(grid, i)) return true;
  }

  // Finally, diagonals.
  if (threeInADiagonal(grid)) return true;
  if (threeInAReverseDiagonal(grid)) return true;
}




/***
* Checks GameState.
***/
function checkGameState() {
  // Minimum of five moves is needed for a winning constellation.
  if (moveCount < 5) {
    return false;
  }

  // A player has scored three in a row.


  if (threeInAGrid(tttGrid)) {
    console.log(activePlayer + ' has won');
    // TODO: Actually, call Game Over function.
    return true;
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
  tttGrid = initializeGrid();
}
