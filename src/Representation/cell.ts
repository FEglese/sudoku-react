class Cell {
  isFixed: boolean;
  value: number;

  constructor(isFixed:boolean, cellValue:number){
    this.isFixed = isFixed;
    this.value = cellValue;
  }
}

export default Cell;