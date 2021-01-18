class SudokuSolver {
  constructor() {
    this.solution = {
      finished: false
    }
  }
  validate(puzzleString) {
    this.solution.finished = false;
    puzzleString = puzzleString.split('')
    const puzzle = [] 
    let row = []
    for(let item of puzzleString) {
        if(item !== '.' && !/[1-9]/.test(item)) return false
    }
    for(let i = 0; i <= 81; i++) {
        if(i % 9 === 0) {
            if(row.length > 0){
                puzzle.push(row)
            }
            row = []
        }
        row.push(puzzleString[i])
    }
    if(!this.checkPuzzleUnsolvable(puzzle)) {
      return 'Puzzle can\'t be solved!'
    }
    return puzzle
  } 

  checkPuzzleUnsolvable(puzzle) {
    if(!this.checkRowUnsolvable(puzzle)) return false
    if(!this.checkColUnsolvable(puzzle)) return false
    if(!this.checkRegionUnsolvable(puzzle)) return false
    return true
  }

  checkRowUnsolvable(puzzle) {
    for(let i = 0; i < 9; i++){
      for(let k = 0; k < 9; k++) {
        let checker = puzzle[i][k]
        if(checker !== '.') {
          if(puzzle[i].filter(item => item === checker).length > 1) return false
        }
      }
    }
    return true
  }
  checkColUnsolvable(puzzle) {
    const colPuzzle = []
    let column = []
    for(let i = 0; i < 9; i++) {
      column = []
      for(let k = 0; k < 9; k++) {
        column.push(puzzle[k][i])
      }
      colPuzzle.push(column)
    }
    if(!this.checkRowUnsolvable(colPuzzle)) return false
    return true
  }
  checkRegionUnsolvable(puzzle) {
    const regionPuzzle = []
    let region = [];
    let region2 = [];
    let region3 = [];
    for(let i = 0; i <= 9; i++) {
      if(i % 3 === 0) {
        if(region.length > 0) {
          regionPuzzle.push(region)
          regionPuzzle.push(region2)
          regionPuzzle.push(region3)
          region = []
          region2 = []
          region3 = []
        }
      }
      if(i < 9) {
        for(let k = 0; k < 3; k++) {
          if(k === 0) {
            region.push(...puzzle[i].slice(k * 3, k * 3 + 3))
          }
          else if(k === 1) {
            region2.push(...puzzle[i].slice(k * 3, k * 3 + 3))
          }else {
            region3.push(...puzzle[i].slice(k * 3, k * 3 + 3))
          }
        }
      }
    }
    if(!this.checkRowUnsolvable(regionPuzzle)) return false
    return true
  }

  checkRowPlacement(puzzle, row, column, value) {
    const rowArr = puzzle[row]
    if(rowArr[column] !== '.') return false
    if(rowArr.includes(value)) return false
    else return true
  }

  checkColPlacement(puzzle, row, column, value) {
    const colArr = []
    for(let i = 0; i < 9; i ++) {
        colArr.push(puzzle[i][column])
    }
    if(colArr[row] !== '.') return false
    if(colArr.includes(value)) return false
    else return true
  }

  checkRegionPlacement(puzzle, row, column, value) {
    const regionArr = []
    const startRowRegion = row - (row % 3)
    const startColRegion = column - (column % 3)
    for(let i = startRowRegion; i < startRowRegion + 3; i++) {
        regionArr.push(puzzle[i].slice(startColRegion, startColRegion + 3))
    }
    if(regionArr[row % 3][column % 3] !== '.') return false
    for(let arr of regionArr) {
      if(arr.includes(value)) return false
    }
    return true
  }

  solve(puzzle) {
    if(this.solution.finished) return this.solution.solution
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            let row = i
            let column = j
            let item = puzzle[i][j]
            if(item === '.') {
                for(let k = 1; k < 10; k++) {
                    let value = k.toString()
                    if(this.checkRowPlacement(puzzle, row, column, value) && this.checkRegionPlacement(puzzle, row, column, value) && this.checkColPlacement(puzzle, row, column, value)) {
                        puzzle[i][j] = value
                        this.solve(puzzle)
                        puzzle[i][j] = '.'
                    }
                }
                return null
            }
        }
    }
    this.solution.finished = true
    this.solution.solution = puzzle.flat().join('')
  }
}

module.exports = SudokuSolver;


