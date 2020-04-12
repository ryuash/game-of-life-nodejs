import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import socket from './socket';
import { Users, GameOfLife } from './services';

export const app: any = express();

const PORT = process.env.PORT || '8080';

export const users = new Users();
export const gameOfLife = new GameOfLife();

app.use(cors());
app.use((req: any, res: any) => res.status(404).send('Not Found.'));

export const startServer = (): any => {
  const server = app.listen(PORT, (err: any) => {
    if (err) return console.error(err);
    return console.log(`Server is listening on ${PORT}`);
  });

  const io = socketio(server);

  socket(io, users, gameOfLife);
};

startServer();
