import React from 'react';
import Cell from './cell.jsx';
import Cordinate from './cordinate';
import CellObject from './cellObject';

import {getNewProlem} from './problemGenerator';

class Sudoku extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      squareValues: [
        Array(9).fill(new CellObject(false, 0)),
        Array(9).fill(new CellObject(false, 0)),
        Array(9).fill(new CellObject(false, 0)),
        Array(9).fill(new CellObject(false, 0)),
        Array(9).fill(new CellObject(false, 0)),
        Array(9).fill(new CellObject(false, 0)),
        Array(9).fill(new CellObject(false, 0)),
        Array(9).fill(new CellObject(false, 0)),
        Array(9).fill(new CellObject(false, 0)),
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

  isCellInSelectedBox(cell){

  }

  renderCell(cellObj, cellCordinate) {
    var isSelected = JSON.stringify(this.state.selectedCell) === JSON.stringify(cellCordinate);
    var isHighligted = false;
    if(!isSelected){
      isHighligted = this.state.selectedCell.row === cellCordinate.row
        || this.state.selectedCell.col === cellCordinate.col;
    }
    
    return (
      <Cell
        value={cellObj.value}
        onClick={() => this.handleCellonClick(cellCordinate)}
        isFixed={cellObj.isFixed}
        isSelected={isSelected}
        isHighligted={isHighligted}
        row={cellCordinate.row}
        col={cellCordinate.col}
        key={cellCordinate.row + ',' + cellCordinate.col }
      />
    )
  }

  handleCellonClick(cellCordinate) {
    this.setState({selectedCell: cellCordinate});
  }

  handleNumPress(e) {
    if(e.keyCode < 48 |
      e.keyCode > 57 |
      this.state.selectedCell.row === null|
      this.state.selectedCell.col === null){
      return;
    }

    this.setCellValue(
      this.state.selectedCell.row,
      this.state.selectedCell.col,
      e.keyCode - 48)

  }

  newEasyBoard() {    
    this.setState({
      squareValues: getNewProlem('easy'),
      selectedCell: new Cordinate(null, null),
    })
  }

  newMediumBoard() {
    this.setState({
      squareValues: getNewProlem('medium'),
      selectedCell: new Cordinate(null, null),
    })
  }

  setCellValue(row, col, value) {
    let tempSquares = this.state.squareValues.slice();
    tempSquares[row][col] = new CellObject(false, value)
    this.setState({
      squareValues: tempSquares,
    })
  }

  isArrayValid(line){
    const correctSequence = "[1,2,3,4,5,6,7,8,9]";
    return (JSON.stringify(line.map(x => x[1]).sort()) === correctSequence)
  }

  getCol(colNum){
    var collumn = [];
    for(var i = 0; i<this.state.squareValues.length; i++){
      collumn.push(this.state.squareValues[i][colNum]);
    }
    return collumn;
  }

  getSquareValues(squareNum){
    var valuesArray = [];
    var baseRow = Math.floor(squareNum / 3) * 3;
    var baseCol = (squareNum % 3) * 3;

    valuesArray.push(this.state.squareValues[baseRow].slice(baseCol, baseCol + 3));
    valuesArray.push(this.state.squareValues[baseRow + 1].slice(baseCol, baseCol + 3));
    valuesArray.push(this.state.squareValues[baseRow + 2].slice(baseCol, baseCol + 3));

    return valuesArray.flat(1);
  }

  completeStatus(){
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