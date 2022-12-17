# tic-tac-toe
tic tac tue CLT for code challenge from amplimind


## Installation
`yarn install`

## Build
`yarn build`
Compiled file will be found `dist/index.js`

## Development
`yarn start`
Automatically update complied file if you edit script in src/.

## Specifications
* CLI
* tic toc toe (3x3)
* a round is played by 2 players (X and O)
* a player input a position of own mark (turn)
* the position must be within 3 x 3
* X starts has the first turn in the first round
* players play turn alternately (X > O > X ...)
* if a same mark place horizontal, vertical, or diagonal row, it wins
* the looser get the first turn in the next round
* when all 9 cells are placed and nobody has 3 marks in row, it's draw
* after draw, X get the first turn in the next round
* rounds should be continue endless

1. *US1* after starting the program, the empty grid should be printed
	1. the empty grid must be 3 x 3
	2. "X: please enter the position of your mark (row:column):" should be printed
2. *US2* a player can enter the position of a mark
	1. input must be row:column (1:1)
	2. "The inserted field is not valid. Try again:" should be printed by a wrong input
	3. after entering a position, the grid with mark should be printed
		1. the mark should be correct
		2. the position should be correct
3. *US3* play rounds
	1. rounds should be played alternately
		1. X takes the first turn of the first round
		1. X takes the first turn after draw
		2. the looser takes first turn of the next round
	2. turns should be played alternately in a round
	3. after each positioning a mark, winner (or draw) should be detected
		1. if a player won, it should be printed
			1. "() won. Press enter to start a new round"
		2. or draw, it should be printed
			1. "draw. Press enter to start a new round"
		3. if a round should be continue, "(): please enter the position of your mark (row:column):" should be printed
			1. () should be the next player
4. *US4* print stats
	1. by pressing "p", stats should be printed
		2. at any time
	2. press enter to back to the game
4. *US5* end the program
	1. by pressing "e", the program should be terminated
		2. at any time


## Inputs
1. row:column (2-1, 2-2)
2. enter (3-3-a, 3-3-b, 4-2)
3. e
4. p

## Prints
1. Round Start
	1. round start message
	2. empty grid
	3. insert message
		1. message for X
		2. message for O
2. Turn result
	1. grid (should has marks)
	3. insert message
		1. message for X
		2. message for O
3. Result
	1. grid (should has marks)
	2. winner
		1. X
		2. O
	3. draw
	4. restart message
4. Stats
	1. stats
		1. X wins
		2. O wins
  2. back to the game message