import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import SudokuSolver, { generateBoard, validCellValue } from '../../sudoku';
import './SudokuGame.css';

export default function SudokuGame() {
  const [board, setBoard] = useState<number[][]>(generateBoard());
  const [solved, setSolved] = useState<boolean>(false);

  const clearBoard = useCallback(() => {
    setSolved(false);
    setBoard(generateBoard());
  }, [setSolved, setBoard]);

  const solveSudoku = useCallback(() => {
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
  }, [board, setSolved, setBoard]);

  const changeBoardValue = useCallback(
    (row: number, col: number, value: number) => {
      const newBoard = [...board];
      if (validCellValue(value)) {
        newBoard[row][col] = value;
        setBoard([...board]);
      }
    },
    [board, setBoard],
  );

  return (
    <div className="sudoku-board__container">
      <h1 className="sudoku-board__heading">Sudoku Cheat 📝</h1>
      <table className="sudoku-board__table">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr className="sudoku-board__table-row" key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={`sudoku-board__table-cell ${
                    solved ? 'sudoku-board__table-cell--solved' : ''
                  }`}
                >
                  <input
                    className="sudoku-board__table-cell-input"
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
      <div className="sudoku-board__controls">
        <button onClick={clearBoard}>Clear 🗑️</button>
        <button
          className="sudoku-board__solve-button"
          disabled={solved}
          onClick={solveSudoku}
        >
          Solve ✅
        </button>
      </div>
    </div>
  );
}
