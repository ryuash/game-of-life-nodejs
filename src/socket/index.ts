const init = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`);
    socket.broadcast.emit('joinGame', socket.id);

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
    });
  });
};

export default init;
