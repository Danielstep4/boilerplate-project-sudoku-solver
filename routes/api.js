'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let Solver = new SudokuSolver();
  let rowToNumber = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8
  }
  app.route('/api/check')
    .post((req, res) => {
      if(!req.body.value || !req.body.coordinate[0] || !req.body.coordinate[1] || !req.body.puzzle ) {
        res.json({
          error: 'Required field(s) missing'
        });
        return console.log('Required field(s) missing');
      }
      if(req.body.value < 1 || req.body.value > 9) {
        res.json({
          error: 'invalid value'
        });
        return console.log('invalid number');

      }else if(!Object.keys(rowToNumber).includes(req.body.coordinate[0].toUpperCase())) {
        res.json({
          error: 'Invalid coordinate'
        });
        return console.log('invalid number');
      }else if(+req.body.coordinate.slice(1) < 1 || +req.body.coordinate.slice(1) > 9) {
        res.json({
          error: 'Invalid coordinate'
        });
        return console.log('invalid number');
      }
      let puzzleString = req.body.puzzle 
      if(!Solver.validate(puzzleString)) {
        res.json({
          error: 'Invalid characters in puzzle'
        })
        return console.log('Invalid characters in puzzle')
      }
      
      if(puzzleString.length !== 81) {
        res.json({
          error: 'Expected puzzle to be 81 characters long'
        })
        return console.log('Expected puzzle to be 81 characters long')
      }
      let row = rowToNumber[req.body.coordinate[0].toUpperCase()]
      let column = req.body.coordinate[1] - 1
      let value = req.body.value
      let conflict = []
      let colPlacement = !Solver.checkColPlacement(puzzleString, row, column, value) ? conflict.push('column') : true
      let regionPlacment = !Solver.checkRegionPlacement(puzzleString, row, column, value) ? conflict.push('region') : true
      let rowPlacement = !Solver.checkRowPlacement(puzzleString, row, column, value) ? conflict.push('row') : true
      if(conflict.length > 0) {
        res.json({
          valid: false,
          conflict
        })
      }else {
        res.json({
          valid: true
        })
      }  
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle
      if(!Solver.validate(puzzleString)) {
        res.json({
          error: 'Invalid characters in puzzle'
        })
        return console.log('Invalid characters in puzzle')
      }
      if(puzzleString.length !== 81) {
        res.json({
          error: 'Expected puzzle to be 81 characters long'
        })
        return console.log('Expected puzzle to be 81 characters long')
      }
      Solver.solve(puzzleString)
    });
};
