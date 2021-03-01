// Libraries
import React from 'react';

// Components
import CellVM from './cell';

// Objects
import Cell from '../Representation/cell';
import Cordinate from '../Representation/cordinate';

// Enums
import gameDifficulty from '../enums/gameDifficulty';

// Services
import {newProblem} from '../services/problemGeneratorService';

interface Props {

}

interface State {
  selectedCell: Cordinate;
  squareValues: Cell[][];
}

class Sudoku extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);    
    this.state = {
      squareValues: [
        Array(9).fill(new Cell(false, 0)),
        Array(9).fill(new Cell(false, 0)),
        Array(9).fill(new Cell(false, 0)),
        Array(9).fill(new Cell(false, 0)),
        Array(9).fill(new Cell(false, 0)),
        Array(9).fill(new Cell(false, 0)),
        Array(9).fill(new Cell(false, 0)),
        Array(9).fill(new Cell(false, 0)),
        Array(9).fill(new Cell(false, 0)),
      ],
      selectedCell: new Cordinate(null, null),
    }

    this.handleNumPress = this.handleNumPress.bind(this);
    this.newEasyBoard   = this.newEasyBoard.bind(this);
    this.newMediumBoard = this.newMediumBoard.bind(this);

  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleNumPress);
  }

  renderCell(cellObj: Cell, cellCordinate: Cordinate) {
    var isSelected = JSON.stringify(this.state.selectedCell) === JSON.stringify(cellCordinate);
    var isHighligted = false;
    if(!isSelected){
      isHighligted = this.state.selectedCell.row === cellCordinate.row
        || this.state.selectedCell.col === cellCordinate.col;
    }

    return (
      <CellVM
        value={cellObj.value}
        onClick={() => this.handleCellonClick(cellCordinate)}

        isFixed={cellObj.isFixed}
        isSelected={isSelected}
        isHighligted={isHighligted}

        isBottomBorder={(cellCordinate?.row ?? 0) % 3 === 2 && cellCordinate.row !== 8}
        isRightBorder={(cellCordinate?.col ?? 0) % 3 === 2 && cellCordinate.col !== 8}

        key={cellCordinate.row + ',' + cellCordinate.col }
      />
    )
  }

  handleCellonClick(cellCordinate : Cordinate) {
    this.setState({selectedCell: cellCordinate});
  }

  handleNumPress(e : KeyboardEvent) :void {
    if(e.keyCode < 48 ||
      e.keyCode > 57 ||
      this.state.selectedCell.row === null||
      this.state.selectedCell.col === null){
      return;
    }

    this.setCellValue(
      this.state.selectedCell.row,
      this.state.selectedCell.col,
      e.keyCode - 48)
  }

  newEasyBoard() :void {    
    this.setState({
      squareValues: newProblem(gameDifficulty.EASY),
      selectedCell: new Cordinate(null, null),
    })
  }

  newMediumBoard() :void {
    this.setState({
      squareValues: newProblem(gameDifficulty.MEDIUM),
      selectedCell: new Cordinate(null, null),
    })
  }

  setCellValue(row:number, col:number, value:number) :void {
    let tempSquares = this.state.squareValues.slice();
    tempSquares[row][col] = new Cell(false, value)
    this.setState({
      squareValues: tempSquares,
    })
  }

  isArrayValid(line: Cell[]) :boolean {
    const correctSequence = "[1,2,3,4,5,6,7,8,9]";
    return (JSON.stringify(line.map(x => x.value).sort()) === correctSequence)
  }

  getCol(colNum: number) :Cell[] {
    var collumn = [];
    for(var i = 0; i<this.state.squareValues.length; i++){
      collumn.push(this.state.squareValues[i][colNum]);
    }
    return collumn;
  }

  getSquareValues(squareNum: number){
    var valuesArray = [];
    var baseRow = Math.floor(squareNum / 3) * 3;
    var baseCol = (squareNum % 3) * 3;

    valuesArray.push(this.state.squareValues[baseRow].slice(baseCol, baseCol + 3));
    valuesArray.push(this.state.squareValues[baseRow + 1].slice(baseCol, baseCol + 3));
    valuesArray.push(this.state.squareValues[baseRow + 2].slice(baseCol, baseCol + 3));

    return valuesArray.flat(1);
  }

  completeStatus() :string{
    var flattenedCells = this.state.squareValues.slice().flat(1);

    if(flattenedCells.filter(cell => cell.value === 0).length){
      return 'Sudoku!';
    }

    for(var i = 0; i < 9; i++){
      var thisRow = this.state.squareValues[i];
      var thisCol = this.getCol(i);
      var thisSquare = this.getSquareValues(i);

      if (!this.isArrayValid(thisRow) || !this.isArrayValid(thisCol) || !this.isArrayValid(thisSquare)){
        return 'Something not quite right...';
      }
    }
    return 'Winner! Well done!';
  }

  render() {
    var status = this.completeStatus();

    return (
      <div className='game'>
        <h2 className='status'>{status}</h2>
        
        <div className='board'>
          {this.state.squareValues.map((rowVals, rowNum) => (
            <div className={'band'} >
              {rowVals.map((cell, colNum) => (
                this.renderCell(cell, new Cordinate(rowNum, colNum))
              ))}
            </div>
          ))}
        </div>

        <div className='pt-3'>
          <button type='button' className='btn btn-outline-primary btn-lg btn-block' onClick={this.newEasyBoard}>New Easy Board</button>
          <button type='button' className='btn btn-outline-primary btn-lg btn-block' onClick={this.newMediumBoard}>New Medium Board</button>
        </div>
      </div>
    );
  }
}

export default Sudoku;