import {
  ICell,
  IAliveCell,
  IUpdateBoard,
  ICellColor,
} from '../types/gameOfLifeTypes';

class GameOfLife {
  board: ICell[][];
  rows: number;
  columns: number;

  constructor() {
    this.rows = 20;
    this.columns = 20;
    this.board = [];
  }

  setInitialBoard(row: number, col: number): void {
    const newBoard: ICell[][] = Array.from(Array(row), () => (
      Array.from(Array(col), () => 0)
    ));

    this.board = newBoard;
  }

  getNeighbors(board: ICell[][], currentCol: number, currentRow: number): IAliveCell[] {
    const topCol = currentCol - 1;
    const bottomCol = currentCol + 1;
    const leftRow = currentRow - 1;
    const rightRow = currentRow + 1;
    const neighbors: IAliveCell | any[] = [];

    for (let col = topCol; col <= bottomCol; col += 1) {
      if (board[col]) {
        for (let row = leftRow; row <= rightRow; row += 1) {
          const notCurrentCell = col !== currentCol || row !== currentRow;
          if (board[col][row] && notCurrentCell) {
            neighbors.push(board[col][row]);
          }
        }
      }
    }

    return neighbors;
  }

  compareColors(original: IAliveCell, newColor: ICellColor): boolean {
    if (original.colorR !== newColor.colorR) {
      return false;
    }
    if (original.colorB !== newColor.colorB) {
      return false;
    }
    if (original.colorG !== newColor.colorG) {
      return false;
    }

    return true;
  }

  updateBoard(board: ICell[][], data: IUpdateBoard[]): ICell[][] {
    const newBoard: ICell[][] = [];
    for (let currentCol = 0; currentCol <= board.length - 1; currentCol += 1) {
      const newRow: ICell[] = [];
      for (let currentRow = 0; currentRow <= board[currentCol].length - 1; currentRow += 1) {
        newRow.push(board[currentCol][currentRow]);
      }
      newBoard.push(newRow);
    }

    for (let i = 0; i <= data.length - 1; i += 1) {
      const { row, col, color } = data[i];
      const currentCell = newBoard[col][row];
      let newCell = currentCell;

      if (currentCell && this.compareColors(currentCell, color)) {
        newCell = 0;
      } else {
        newCell = {
          value: 1,
          ...color,
        };
      }
      newBoard[col][row] = newCell;
    }

    return newBoard;
  }

  newCellColor(neighbors: IAliveCell[]): ICellColor {
    const numberOfNeighbors = neighbors.length;
    let colorR = 0;
    let colorB = 0;
    let colorG = 0;

    for (let i = 0; i <= numberOfNeighbors - 1; i += 1) {
      const {
        colorR: neighborR,
        colorB: neighborB,
        colorG: neighborG,
      } = neighbors[i];

      colorR += neighborR;
      colorB += neighborB;
      colorG += neighborG;
    }

    return {
      colorR: Math.floor(colorR / numberOfNeighbors),
      colorG: Math.floor(colorG / numberOfNeighbors),
      colorB: Math.floor(colorB / numberOfNeighbors),
    };
  }

  generateNextGeneration(board: ICell[][]): ICell[][] {
    const nextGeneration: ICell[][] = [];

    for (let col = 0; col <= board.length - 1; col += 1) {
      const newRow: ICell[] = [];
      for (let row = 0; row <= board[col].length - 1; row += 1) {
        const currentCell = board[col][row];
        const neighbors: IAliveCell[] = this.getNeighbors(board, col, row);
        let newCell: ICell | 0 = 0;

        if (currentCell && (neighbors.length >= 2 && neighbors.length <= 3)) {
          newCell = currentCell;
        }

        if (!currentCell && neighbors.length === 3) {
          const newColors = this.newCellColor(neighbors);
          newCell = {
            value: 1,
            ...newColors,
          };
        }
        newRow.push(newCell);
      }
      nextGeneration.push(newRow);
    }
    return nextGeneration;
  }
}

export default GameOfLife;
