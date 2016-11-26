# fcc_tictactoe
TicTacToe Zipline for FreeCodeCamp

[Project description](https://www.freecodecamp.com/challenges/build-a-tic-tac-toe-game)

## User stories
- [TODO] I can play a game of Tic Tac Toe with the computer
- [TODO] My game will reset as soon as it's over so I can play again.
- [TODO] I can choose whether I want to play as X or O


## Memo
- [IDEA] How to best check winning conditions?
Same values for all in same row [x][y], -> [x][0|1|2]
Same values for all in same col [x][y], -> [0|1|2][y]
Same values for row-col pairs [x][y] for [x==y], -> [0,1,2][0,1,2]
Same values for row-col pairs [x][y] for [x + y == 2]. [0,1,2][2,1,0]
0,0 0,1 0,2
1,0 1,1 1,2  
2,0 2,1 2,2

How to iterate.

-> For each row X,
   call threeInARow on the row.
   (This solves the rows)
-> For each col Y in [0][Y],
    get the initial value for [0][y]
    check if [1][y] and [2][y] are equal to it.
  (This solves the columns)   
-> for length of x in [0,1,2](or simply 3)
   check if matrix[x][x] equals initial value.
   (This solves upper left diagonal)
-> finally,
   do a funny addition thing to make sure x+y == len(matrix)-1,
   then check if values at these coordinates are equal.
