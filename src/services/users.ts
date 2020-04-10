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
    if (color.colorR === 255 && color.colorB === 255 && color.colorG === 255) {
      return false;
    }

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
    const max = 255;
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

  setUser(socketId: string, username: string): IUser {
    let user: any = this.users[socketId];
    console.log(user, 'does user exist');
    if (user) {
      user.isConnected = true;
    } else {
      const color = this.getColor();
      user = {
        isConnected: true,
        socketId,
        username,
        ...color,
      };
    }
    this.users[socketId] = user;
    return user;
  }

  disconnectUser(socketId: string): void {
    if (this.users[socketId]) {
      this.users[socketId].isConnected = false;
    }
  }

  removeUser(socketId: string): void {
    const user = this.users[socketId];
    if (user) {
      delete this.users[socketId];
    }
  }

  getAllConnectedUsers(): {} {
    const userKeys = Object.keys(this.users);
    const connectedUsers: any = {};
    userKeys.forEach((x: string) => {
      const user = this.users[x];
      if (user.isConnected) {
        connectedUsers[x] = user;
      }
    });

    return connectedUsers;
  }

  getCountOfConnectedUsers(): number {
    const userKeys = Object.keys(this.users);
    let count = 0;
    userKeys.forEach((x: string) => {
      const user = this.users[x];
      if (user.isConnected) {
        count += 1;
      }
    });
    return count;
  }
}

export default Users;
