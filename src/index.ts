import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import socket from './socket';

const app = express();

const PORT = process.env.PORT || '8080';

app.use(cors());
app.use((req: any, res: any) => res.status(404).send('Not Found.'));

const startServer = (): any => {
  const server = app.listen(PORT, (err: any) => {
    if (err) return console.error(err);
    return console.log(`Server is listening on ${PORT}`);
  });

  const io = socketio(server);
  socket(io);
};

startServer();
