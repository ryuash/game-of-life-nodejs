import { ICellColor } from './gameOfLifeTypes';

export interface IUser extends ICellColor {
  socketId: string;
}
