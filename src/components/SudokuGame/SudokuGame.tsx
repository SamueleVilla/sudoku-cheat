import { useCallback, useState, useEffect, useRef } from 'react';

import SudokuSolver, { generateBoard, validCellValue } from '../../sudoku';
import useCustomToast from '../Toast/useCustomToast';
import './SudokuGame.css';

export default function SudokuGame() {
  const [board, setBoard] = useState<number[][]>(generateBoard());
  const [solved, setSolved] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cellRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
  );

  const toast = useCustomToast();

  const clearBoard = useCallback(() => {
    setSolved(false);
    setBoard(generateBoard());
    toast.showInfo('Board cleared!', '🗑️');
  }, [setSolved, setBoard, toast]);

  const solveSudoku = useCallback(() => {
    setSolved(false);
    setIsLoading(true);

    const loadingToast = toast.showLoading('Solving puzzle...');

    // Simulate loading for better UX
    setTimeout(() => {
      const sudokuSolver = new SudokuSolver(board);
      const { solved, board: solvedBoard } = sudokuSolver.solveSudoku();

      toast.dismiss(loadingToast);

      if (solved) {
        setSolved(true);
        setBoard([...solvedBoard]);
        toast.showSuccess('Sudoku solved successfully!');
      } else {
        setSolved(false);
        toast.showError('Cannot solve this board');
      }
      setIsLoading(false);
    }, 800);
  }, [board, setSolved, setBoard, toast]);

  const changeBoardValue = useCallback(
    (row: number, col: number, value: number) => {
      const newBoard = [...board];
      if (validCellValue(value) || value === 0) {
        newBoard[row][col] = value;
        setBoard(newBoard);
      }
    },
    [board, setBoard],
  );

  // Focus the first cell when the component loads
  useEffect(() => {
    cellRefs.current[0][0]?.focus();
  }, []);

  return (
    <div className="sudoku-board__container">
      <h1 className="sudoku-board__heading">Sudoku Cheat 📝</h1>
      <div className="sudoku-board__instructions">
        Fill the board or let AI solve it for you
      </div>

      <div className="sudoku-board__table-container">
        <table className="sudoku-board__table">
          <tbody>
            {board.map((row, rowIndex) => (
              <tr className="sudoku-board__table-row" key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className={`sudoku-board__table-cell ${
                      solved ? 'sudoku-board__table-cell--solved' : ''
                    } ${
                      selectedCell &&
                      selectedCell[0] === rowIndex &&
                      selectedCell[1] === cellIndex
                        ? 'sudoku-board__table-cell--selected'
                        : ''
                    } ${
                      selectedCell && selectedCell[0] === rowIndex
                        ? 'sudoku-board__table-cell--same-row'
                        : ''
                    } ${
                      selectedCell && selectedCell[1] === cellIndex
                        ? 'sudoku-board__table-cell--same-col'
                        : ''
                    }`}
                    data-box={
                      (Math.floor(rowIndex / 3) + Math.floor(cellIndex / 3)) %
                        2 ===
                      0
                        ? 'even'
                        : 'odd'
                    }
                  >
                    <input
                      className="sudoku-board__table-cell-input"
                      value={cell !== 0 ? cell : ''}
                      type="number"
                      min="1"
                      max="9"
                      ref={(el) => (cellRefs.current[rowIndex][cellIndex] = el)}
                      onChange={(e) => {
                        changeBoardValue(
                          rowIndex,
                          cellIndex,
                          !isNaN(Number(e.target.value))
                            ? Number(e.target.value)
                            : 0,
                        );
                      }}
                      onFocus={() => setSelectedCell([rowIndex, cellIndex])}
                      onBlur={() => setSelectedCell(null)}
                      disabled={isLoading || solved}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sudoku-board__controls">
        <button
          onClick={clearBoard}
          className="sudoku-board__clear-button"
          disabled={isLoading}
        >
          Clear 🗑️
        </button>
        <button
          className="sudoku-board__solve-button"
          disabled={solved || isLoading}
          onClick={solveSudoku}
        >
          {isLoading ? 'Solving...' : 'Solve ✅'}
        </button>
      </div>
    </div>
  );
}
