import Cell from "../interfaces/cell";

function getSquareValues(squareNum: number, board: Cell[][]): number[] {
	let valuesArray: Cell[][] = [];
	let baseRow = Math.floor(squareNum / 3) * 3;
	let baseCol = (squareNum % 3) * 3;

	valuesArray.push(board[baseRow].slice(baseCol, baseCol + 3));
	valuesArray.push(board[baseRow + 1].slice(baseCol, baseCol + 3));
	valuesArray.push(board[baseRow + 2].slice(baseCol, baseCol + 3));
	return valuesArray.flat(1).map((x) => x.value);
}

function isArrayValid(line: number[]): boolean {
	const correctSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	return JSON.stringify(line.sort()) === JSON.stringify(correctSequence);
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

export { getSquareValues, isArrayValid, completeStatus };
