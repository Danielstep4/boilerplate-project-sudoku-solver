class SudokuSolver {

  validate(puzzleString) {
    puzzleString = puzzleString.split('')
    for(let item of puzzleString) {
      if(item !== '.' && !/[1-9]/.test(item)) return false
    }
    return true
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
    if(colArr.includes(value)) return false
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
    while(puzzleString.includes('.')) {
      for(let i = 0; i < 81; i++) {
        let item = puzzleString[i]
        if(item === '.') {
          let row = Math.floor(i / 9)
          let column = i % 9
          let optionalValues = []
          for(let k = 1; k < 10; k++) {
            let value = k.toString()
            if(this.checkRowPlacement(puzzleString, row, column, value) && this.checkRegionPlacement(puzzleString, row, column, value) && this.checkColPlacement(puzzleString, row, column, value)) {
              optionalValues.push(value)
            }
          }
          if(optionalValues.length === 0) return false
          puzzleString = puzzleString.split('')
          puzzleString[i] = optionalValues.length === 1 ? optionalValues[0] : '.'
          puzzleString = puzzleString.join('')
        }
      }
    }
    return puzzleString
  }
}

module.exports = SudokuSolver;

