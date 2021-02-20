import CellObject from './cellObject'

const blankProblem = [
  Array(9).fill(new CellObject(false,0)),
  Array(9).fill(new CellObject(false,0)),
  Array(9).fill(new CellObject(false,0)),
  Array(9).fill(new CellObject(false,0)),
  Array(9).fill(new CellObject(false,0)),
  Array(9).fill(new CellObject(false,0)),
  Array(9).fill(new CellObject(false,0)),
  Array(9).fill(new CellObject(false,0)),
  Array(9).fill(new CellObject(false,0)),
]

// TODO: Put these problems into csv files
const easyProblems = [
  '900600300000000469600540000378005002000763015060028704030157906045300120100080500',
  '800340076000071435073000081209760000734090000000132009508007100342900060100680000',
  '820300009009750800030080600006230007218547000700090080004105008060070410005904763',
  '600079032000060500209008700906305001850000300473001250042680900000013427090200600',
  '072031900800009057500820010204003090396210045100006032003000020405960008900004001',
  '030000000900030500008005103060500700500367240400800600307080916002690475694750002',
  '400800007350672004280000103000007000028300400070204916092405030800763009730000051'
]

const mediumProblems = [
  '003006004000108207002900010049700032070080100000690005007000000508360000000514300',
  '000013040000600005100054060001030000003062058608079002900040000000026009430801000',
  '004068900500040078000197200000000000800034026201000097070920050000000002652400000',
  '070030200005002900400900000004205090010390706200000005192700030047500100000103000',
]

function getNewProlem(difficulty) {
  if (difficulty === 'medium'){
    return generateBoard(mediumProblems[Math.floor(Math.random() * mediumProblems.length)]);
  } else if ( difficulty === 'easy'){
    return generateBoard(easyProblems[Math.floor(Math.random() * easyProblems.length)]);
  } else{
    return blankProblem.slice();
  }
}

function generateBoard(problemString) {
  let newBoard = blankProblem.slice();

  for (let i = 0; i < 81; i++) {
    var boardVal = parseInt(problemString[i])
    newBoard[Math.floor(i / 9)][i % 9] = new CellObject(boardVal !== 0, boardVal);
  }

  return newBoard;
}

export {getNewProlem};