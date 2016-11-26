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


/***
* Checks if items in a row are equal.
***/
function threeInARow(row) {
  // Get initial item and compare all other items against it.
  // If all items are equal, this will return true.
  console.log(row);

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
  return row[0];
}

/***
* Checks if items in a column are equal.
***/
function threeInAColumn(grid, ci) {
  // ci = column index
  if (grid[0][ci] == null) {
    return false;
  }

  for (var j = 1; j < grid.length; j++) {
    if (grid[j][ci] != grid[0][ci]) {
      return false;
    }
  }
  console.log("All same");
  return grid[ci];
}


/***
* Checks GameState.
***/
function checkGameState() {
  // A player has scored three in a row.
  // TODO: Implement this for columns and diagonals.
  tttGrid.forEach(function(row) {
    var allSame = threeInARow(row);
    if (allSame) {
      console.log(allSame + ' has won');
      // TODO: Actually, call Game Over function.
      return true;
    }
  })
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



/**
Let's jury-rig a successful checker here
**/
var riggedMatrix = [
  ['X',  null, 'X'],
  [null, 'O',  'X'],
  ['O',  'X',  'X']
]

console.log(riggedMatrix.length);

// Do the rows first.
for (var i = 0; i < riggedMatrix.length; i++) {
  // riggedMatrix[i]
  threeInARow(riggedMatrix[i]);
  threeInAColumn(riggedMatrix, i);
}

// Columns next.
for (var i = 0; i < riggedMatrix.length; i++) {
}

// Finally, diagonals.



  // // If initial item not set return false.
  // if (row[0] == null) {
  //   return false;
  // }
  // // If any item differs from initial, return false.
  // for (var i = 1; i < row.length; i++) {
  //   if (row[i] != row[0]) {
  //     return false;
  //   }
  // }
  // console.log("All same");
  // return row[0];
  //
