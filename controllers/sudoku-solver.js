class SudokuSolver {

  validate(puzzleString) {
    if(puzzleString.length !== 81) return false
    else return true
  } 

  checkRowPlacement(puzzleString, row, column, value) {
    let startRow = row * 9
    const rowArr = puzzleString.split('').slice(startRow, startRow + 9)
    if(rowArr[column] !== '.') return false
    if(rowArr.includes(value)) return false
    else return true
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colArr = []
    for(let i = column; i < 81; i += 9) {
      colArr.push(puzzleString[i])
    }
    if(colArr[row] !== '.') return false
    if(colArr.includes('value')) return false
    else return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionArr = []
    const startRowRegion = (row - (row % 3)) * 9
    const startColRegion = column - (column % 3)
    for(let i = startColRegion; i < 27; i+=9) {
      let result = []
      for(let j = 0; j < 3;j++) {
        result.push(puzzleString[i + startRowRegion + j])
      }
      regionArr.push(result)
    }
    column = column % 3
    row = row % 3
    if(regionArr[row][column] !== '.') return false
    for(let arr of regionArr) {
      if(arr.includes(value)) return false
    }
    return true
  }

  solve(puzzleString) {
    console.log('Solved')
  }
}

module.exports = SudokuSolver;

