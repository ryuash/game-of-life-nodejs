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
      const user: IUser = users[i];
      if (user.colorR !== color.colorR) {
        return true;
      }

      if (user.colorB !== color.colorB) {
        return true;
      }

      if (user.colorG !== color.colorG) {
        return true;
      }
    }
    return false;
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

  setUser(socketId: string): void {
    if (!this.users[socketId]) {
      const color = this.generateRandomColor();
      this.users[socketId] = {
        socketId,
        ...color,
      };
    }
  }

  removeUser(socketId: string): void {
    delete this.users[socketId];
  }
}

export default Users;
