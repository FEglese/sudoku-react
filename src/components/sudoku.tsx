// Libraries
import React from "react";

// Components
import CellVM from "./cell";
import NumButton from "./numButton";

// Interfaces
import Cell from "../interfaces/cell";
import Cordinate from "../interfaces/cordinate";

// Enums
import gameDifficulty from "../enums/gameDifficulty";

// Services
import { newProblem } from "../services/problemGeneratorService";
import * as validationService from "../services/boardValidationService";

interface Props {}

interface State {
	selectedCell: Cordinate;
	squareValues: Cell[][];
}

class Sudoku extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			squareValues: [
				Array(9).fill({ isFixed: false, value: 0 }),
				Array(9).fill({ isFixed: false, value: 0 }),
				Array(9).fill({ isFixed: false, value: 0 }),
				Array(9).fill({ isFixed: false, value: 0 }),
				Array(9).fill({ isFixed: false, value: 0 }),
				Array(9).fill({ isFixed: false, value: 0 }),
				Array(9).fill({ isFixed: false, value: 0 }),
				Array(9).fill({ isFixed: false, value: 0 }),
				Array(9).fill({ isFixed: false, value: 0 }),
			],
			selectedCell: { row: null, col: null },
		};

		this.handleNumPress = this.handleNumPress.bind(this);
		this.loadNewBoard = this.loadNewBoard.bind(this);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleNumPress);
	}

	renderCell(thisCell: Cell, cellCordinate: Cordinate) {
		var isSelected =
			JSON.stringify(this.state.selectedCell) === JSON.stringify(cellCordinate);
		var isHighligted = false;
		if (!isSelected) {
			isHighligted =
				this.state.selectedCell.row === cellCordinate.row ||
				this.state.selectedCell.col === cellCordinate.col;
		}

		return (
			<CellVM
				value={thisCell.value}
				onClickHandler={() => this.handleCellonClick(cellCordinate)}
				isFixed={thisCell.isFixed}
				isSelected={isSelected}
				isHighligted={isHighligted}
				isBottomBorder={
					(cellCordinate?.row ?? 0) % 3 === 2 && cellCordinate.row !== 8
				}
				isRightBorder={
					(cellCordinate?.col ?? 0) % 3 === 2 && cellCordinate.col !== 8
				}
				key={cellCordinate.row + "," + cellCordinate.col}
			/>
		);
	}

	handleCellonClick(cellCordinate: Cordinate) {
		this.setState({ selectedCell: cellCordinate });
	}

	handleNumPress(e: KeyboardEvent): void {
		if (
			!e.code.includes("Digit") ||
			!this.state.selectedCell.row ||
			!this.state.selectedCell.col
		) {
			return;
		}

		this.setCellValue(
			this.state.selectedCell.row,
			this.state.selectedCell.col,
			Number(e.key)
		);
	}

	handleNumButtonPress(value: number): void {
		console.log("handling number button press");
		console.log({ value });
		if (
			value > 9 ||
			value < 0 ||
			!this.state.selectedCell.col ||
			!this.state.selectedCell.row
		) {
			return;
		}

		this.setCellValue(
			this.state.selectedCell.row,
			this.state.selectedCell.col,
			value
		);
	}

	loadNewBoard(difficulty: gameDifficulty): void {
		this.setState({
			squareValues: newProblem(difficulty),
			selectedCell: { row: null, col: null },
		});
	}

	setCellValue(row: number, col: number, value: number): void {
		let tempSquares = this.state.squareValues.slice();
		tempSquares[row][col] = { isFixed: false, value };
		this.setState({
			squareValues: tempSquares,
		});
	}

	render() {
		var status = validationService.completeStatus(this.state.squareValues);
		const numButtons = [];

		for (let i = 0; i <= 9; i++) {
			numButtons.push(
				<NumButton
					key={"numKey_" + i}
					value={i}
					onClick={() => this.handleNumButtonPress(i)}
				/>
			);
		}

		return (
			<div className="game">
				<h2 className="status pb-2">{status}</h2>

				<div className="board">
					{this.state.squareValues.map((rowVals, rowNum) => (
						<div className={"band"}>
							{rowVals.map((cell, colNum) =>
								this.renderCell(cell, { row: rowNum, col: colNum })
							)}
						</div>
					))}
				</div>

				<div className="num-button-group btn-group" role="group">
					{numButtons}
				</div>

				<div className="pt-3">
					<button
						type="button"
						className="btn btn-outline-primary btn-lg btn-block"
						onClick={() => this.loadNewBoard(gameDifficulty.EASY)}>
						New Easy Board
					</button>
					<button
						type="button"
						className="btn btn-outline-primary btn-lg btn-block"
						onClick={() => this.loadNewBoard(gameDifficulty.MEDIUM)}>
						New Medium Board
					</button>
				</div>
			</div>
		);
	}
}

export default Sudoku;
