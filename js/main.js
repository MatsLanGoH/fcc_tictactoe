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
  })
  t_listeners.push(t_slot);
};



/****
* TicTacToe logic
****/
var activePlayer = 'O';

function togglePlayer() {
  var currentMove = activePlayer;
  activePlayer =  activePlayer == 'X' ? 'O' : 'X';
  // console.log(currentMove, activePlayer);
  return currentMove;
}

function drawMove(el) {
  if (el.innerHTML.length === 0) {
    el.appendChild(document.createTextNode(togglePlayer()));
    console.log(el.innerHTML);
  }
}
