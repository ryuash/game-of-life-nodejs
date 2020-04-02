const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const socket = require('./socket');
const { rootHandler, helloHandler } = require('./handlers');

const app = express();

const PORT = process.env.PORT || '8080';

app.use(cors());
app.use((req: any, res: any) => res.status(404).send('Not Found.'));

app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);

const startServer = () => {
  const server = app.listen(PORT, (err:any) => {
    if (err) return console.error(err);
    return console.log(`Server is listening on ${PORT}`);
  });

  const io = socketio(server);
  socket(io);
};

startServer();
