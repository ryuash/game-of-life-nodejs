import {
  ICellColor,
} from '../types/gameOfLifeTypes';
import {
  IUser,
} from '../types/usersType';

class Users {
  users: IUser| any;

  constructor() {
    this.users = {};
  }

  isColorUnique(color: ICellColor): boolean {
    const users: any[] = Object.keys(this.users);
    for (let i = 0; i <= users.length - 1; i += 1) {
      const user: IUser = this.users[users[i]];
      const colorR = user.colorR === color.colorR;
      const colorB = user.colorB === color.colorB;
      const colorC = user.colorG === color.colorG;
      if (colorR && colorB && colorC) {
        return false;
      }
    }
    return true;
  }

  generateRandomColor(): ICellColor {
    const max = 225;
    return {
      colorR: Math.floor(Math.random() * max),
      colorB: Math.floor(Math.random() * max),
      colorG: Math.floor(Math.random() * max),
    };
  }

  getColor(): ICellColor {
    let color = this.generateRandomColor();
    let check = this.isColorUnique(color);
    while (!check) {
      color = this.generateRandomColor();
      check = this.isColorUnique(color);
    }

    return color;
  }

  setUser(socketId: string): IUser {
    let user: any = this.users[socketId];
    if (!user) {
      const color = this.getColor();
      user = {
        socketId,
        ...color,
      };
      this.users[socketId] = user;
    }

    return user;
  }

  removeUser(socketId: string): void {
    delete this.users[socketId];
  }
}

export default Users;
