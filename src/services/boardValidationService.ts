import Cell from "../interfaces/cell";

/**
 * Gets the array of values in the 3x3 squares of the sudoku board
 *
 * Top left has index 0, to the right is 1 and so on down to 8 in the
 * bottom right corner
 *
 * @param squareNum index of the 3x3 square from the board
 * @param board input board to return the value of
 * @returns array of values in that square. Empty array if invalid
 */
function getSquareValues(squareNum: number, board: Cell[][]): number[] {
	// Validation
	if (board.length !== 9 || squareNum > 8 || squareNum < 0) {
		throw new Error("Invalid Params");
	}

	let valuesArray: Cell[] = [];
	let baseRow = Math.floor(squareNum / 3) * 3;
	let baseCol = (squareNum % 3) * 3;

	valuesArray.push(...board[baseRow].slice(baseCol, baseCol + 3));
	valuesArray.push(...board[baseRow + 1].slice(baseCol, baseCol + 3));
	valuesArray.push(...board[baseRow + 2].slice(baseCol, baseCol + 3));
	return valuesArray.map((x) => x.value);
}

/**
 * Returns whether the array contains all of the values from 1 to 9
 * and is therefore a correct/valid series of integers
 *
 * @param inputArray The input array being validated against
 * @returns true if the array is valid
 */
function isArrayValid(inputArray: number[]): boolean {
	const correctSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	if (inputArray.length !== 9) return false;
	return JSON.stringify(inputArray.sort()) === JSON.stringify(correctSequence);
}

function completeStatus(board: Cell[][]): string {
	const flattenedCells = board.slice().flat(1);

	for (let i = 0; i < flattenedCells.length; i++) {
		if (!flattenedCells[i].value) return "Sudoku!";
	}

	for (var i = 0; i < 9; i++) {
		var thisRow = board[i].map((x) => x.value);
		var thisCol = getCol(i, board);
		var thisSquare = getSquareValues(i, board);

		if (
			!isArrayValid(thisRow) ||
			!isArrayValid(thisCol) ||
			!isArrayValid(thisSquare)
		) {
			return "Something not quite right...";
		}
	}
	return "Winner! Well done!";
}

function getCol(colNum: number, board: Cell[][]): number[] {
	var collumn = [];
	for (var i = 0; i < board.length; i++) {
		collumn.push(board[i][colNum]);
	}
	return collumn.map((x) => x.value);
}

export { getSquareValues, isArrayValid, completeStatus, getCol };
