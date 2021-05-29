import Cell from "../interfaces/cell";

function getSquareValues(squareNum: number, board: Cell[][]): Cell[] {
	let valuesArray: Cell[][] = [];
	let baseRow = Math.floor(squareNum / 3) * 3;
	let baseCol = (squareNum % 3) * 3;

	valuesArray.push(board[baseRow].slice(baseCol, baseCol + 3));
	valuesArray.push(board[baseRow + 1].slice(baseCol, baseCol + 3));
	valuesArray.push(board[baseRow + 2].slice(baseCol, baseCol + 3));
	return valuesArray.flat(1);
}

function isArrayValid(line: Cell[]): boolean {
	const correctSequence = "[1,2,3,4,5,6,7,8,9]";
	return JSON.stringify(line.map((x) => x.value).sort()) === correctSequence;
}

function completeStatus(board: Cell[][]): string {
	const flattenedCells = board.slice().flat(1);

	if (flattenedCells.filter((cell) => cell.value === 0).length) {
		return "Sudoku!";
	}

	for (var i = 0; i < 9; i++) {
		var thisRow = board[i];
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

function getCol(colNum: number, board: Cell[][]): Cell[] {
	var collumn = [];
	for (var i = 0; i < board.length; i++) {
		collumn.push(board[i][colNum]);
	}
	return collumn;
}

export { getSquareValues, isArrayValid, completeStatus };
