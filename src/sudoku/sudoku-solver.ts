import { BOARD_SIZE } from './helpers';

export default class SudokuSolver {

  private readonly _board: number[][];
  constructor(board: number[][]) {
    this._board = board;
  }


  private isValidRow(row: number, value: number): boolean {
    return !this._board[row].includes(value);
  }

  private isValidColumn(column: number, value: number): boolean {
    return !this._board.some((row) => row[column] === value);
  }

  private isValidBox(row: number, column: number, value: number): boolean {
    const boxRow = Math.floor(row / 3) * 3;
    const boxColumn = Math.floor(column / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxColumn; j < boxColumn + 3; j++) {
        if (this._board[i][j] === value) {
          return false;
        }
      }
    }

    return true;
  }

  private isValidPlacement(row: number, column: number, value: number): boolean {
    return (
      this.isValidRow(row, value) &&
      this.isValidColumn(column, value) &&
      this.isValidBox(row, column, value)
    );
  }

  private findEmpty(): [number, number] | null {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (this._board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  private solve(): boolean {
    const emptyCell = this.findEmpty();
    if (!emptyCell) {
      return true;
    }

    const [row, column] = emptyCell;
    for (let num = 1; num <= BOARD_SIZE; num++) {
      if (this.isValidPlacement(row, column, num)) {
        this._board[row][column] = num;
        if (this.solve()) {
          return true;
        }
        this._board[row][column] = 0;
      }
    }

    return false;
  }

  private isValidBoard(): boolean {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (this._board[row][col] !== 0) {
          const value = this._board[row][col];
          this._board[row][col] = 0;
          if (!this.isValidPlacement(row, col, value)) {
            return false;
          }
          this._board[row][col] = value;
        }
      }
    }
    return true;
  }

  public solveSudoku() {
    const valid = this.isValidBoard();
    if (!valid) {
      return {
        solved: false,
        board: this._board,
      };
    }

    return {
      solved: this.solve(),
      board: this._board,
    };
  }
}
