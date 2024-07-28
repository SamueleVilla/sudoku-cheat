import { useState } from 'react';
import toast from 'react-hot-toast';

import SudokuSolver, { generateBoard, validCellValue } from '../../sudoku';
import './SudokuGame.css';

export default function SudokuGame() {
  const [board, setBoard] = useState<number[][]>(generateBoard());
  const [solved, setSolved] = useState<boolean>(false);

  const clearBoard = () => {
    setSolved(false);
    setBoard(generateBoard());
  };

  const solveSudoku = () => {
    setSolved(false);
    const sudokuSolver = new SudokuSolver(board);
    const { solved, board: solvedBoard } = sudokuSolver.solveSudoku();
    if (solved) {
      setSolved(true);
      setBoard([...solvedBoard]);
      toast.success('Sudoku solved successfully! 🎉', {
        duration: 4000,
        position: 'top-center',
      });
    } else {
      setSolved(false);
      toast.error('Cannot solve this board 😢', {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  const changeBoardValue = (row: number, col: number, value: number) => {
    const newBoard = [...board];
    if (validCellValue(value)) {
      newBoard[row][col] = value;
      setBoard([...board]);
    }
  };

  return (
    <>
      <h1>Sudoku Cheat 📝</h1>
      <table className="sudoku-board">
        <tbody>
        {board.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <td
                key={`cell-${rowIndex}-${cellIndex}`}
                className={`sudoku-cell ${solved ? 'solved' : ''}`}
              >
                <input
                  value={cell != 0 ? cell : ''}
                  type="number"
                  onChange={(e) => {
                    changeBoardValue(
                      rowIndex,
                      cellIndex,
                      !isNaN(Number(e.target.value))
                        ? Number(e.target.value)
                        : -1,
                    );
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div className="sudoku-controls">
        <button onClick={clearBoard}>Clear 🗑️</button>
        <button
          disabled={solved}
          className="solve"
          onClick={() => {
            solveSudoku();
          }}
        >
          Solve <span>✅</span>
        </button>
      </div>
    </>
  );
}
