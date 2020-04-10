export interface ICellColor {
  colorR: number;
  colorB: number;
  colorG: number;
}

export interface IAliveCell extends ICellColor {
  value: 0 | 1;
}

export interface IUpdateBoard {
  col: number;
  row: number;
  color: ICellColor;
}

export type ICell = IAliveCell | 0;
