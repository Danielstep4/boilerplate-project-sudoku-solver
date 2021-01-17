const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const validPuzzleStrings = require('../controllers/puzzle-strings.js')
let solver = new Solver;
let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
let invalidPuzzleString = '..9D.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
let invalidPuzzleString2 = '..9D.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...'
let invalidPuzzleString3 = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..7..'
suite('UnitTests', () => {
    suite('Logic handles a valid puzzle string of 81 characters', () => {
        test('Valid Puzzle input', (done) => {
            assert.equal(solver.validate(puzzleString), true, 'expecting valid puzzle to be true')
            done()
        })
    })
    suite('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        test('Invalid puzzle input', done => {
            assert.equal(solver.validate(invalidPuzzleString), false, 'expecting invalid puzzle to be false')
            done()
        })
    })
    suite('Logic handles a puzzle string that is not 81 characters in length', () => {
        test('puzzle string that is not 81 char', done => {
            assert.equal(solver.validate(invalidPuzzleString2), false, 'expected invalid puzzle to be false')
            done()
        })
    })
    suite('Logic handles a valid row placement', () => {
        test('valid row placement', done => {
            assert.equal(solver.checkRowPlacement(puzzleString,0,0,'7'), true)
            done()
        })
    })
    suite('Logic handles an invalid row placement', () => {
        test('invalid row placement', done => {
            assert.equal(solver.checkRowPlacement(puzzleString,0,0,'1'), false)
            done()
        })
    })
    suite('Logic handles a valid column placement', () => {
        test('valid column placement', done => {
            assert.equal(solver.checkColPlacement(puzzleString,0,0,'7'), true)
            done()
        })
    })
    suite('Logic handles an invalid column placement', () => {
        test('invalid column placement', done => {
            assert.equal(solver.checkColPlacement(puzzleString,0,0,'1'), false)
            done()
        })
    })
    suite('Logic handles a valid region (3x3 grid) placement', () => {
        test('Valid region placement', done => {
            assert.equal(solver.checkRegionPlacement(puzzleString,0,0,'7'), true)
            done()
        })
    })
    suite('Logic handles an invalid region (3x3 grid) placement', () => {
        test('Invalid region placement', done => {
            assert.equal(solver.checkRegionPlacement(puzzleString,0,0,'9'), false)
            done()
        })
    })
    suite('Valid puzzle strings pass the solver', () => {
        test('valid puzzle string', done => {
            assert.isString(solver.solve(puzzleString))
            done()
        })
    })
    suite('Invalid puzzle strings fail the solver', () => {
        test('Invalid puzzle string', done => {
            assert.equal(solver.solve(invalidPuzzleString3), false)
            done()
        })
    })
    suite('Solver returns the the expected solution for an incomplete puzzzle', () => {
        test('valid puzzle string', done => {
            assert.equal(solver.solve('.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'), '473891265851726394926345817568913472342687951197254638734162589685479123219538746')
            done()
        })
    })
});
