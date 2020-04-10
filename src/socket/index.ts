const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  USER_JOIN: 'userJoin',
  GET_ALL_USERS: 'getAllUsers',
  USER_LEFT: 'userLeft',
  GET_CURRENT_BOARD: 'getCurrentBoard',
  CLICK_BOARD: 'clickBoard',
  BOARD_UPDATE: 'boardUpdate',
  GET_SELF: 'getSelf',
  USER_ENTER_GAME: 'userEnterGame',
  USER_REENTER_GAME: 'userReenterGame',
  ERROR: 'error',
};


const init = (io: any, users: any, gameOfLife: any): void => {
  setInterval(() => {
    if (users.getCountOfConnectedUsers() > 0) {
      gameOfLife.generateNextGeneration();
      io.sockets.emit(EVENTS.BOARD_UPDATE, gameOfLife.board);
    }
  }, 5000);

  io.on(EVENTS.CONNECTION, (socket: any) => {
    socket.on(EVENTS.USER_REENTER_GAME, (oldSocketId: string) => {
      const newUser = users.reconnectUser(oldSocketId, socket.id);
      socket.broadcast.emit(EVENTS.USER_JOIN, newUser);
      socket.emit(EVENTS.GET_SELF, newUser);
      socket.emit(EVENTS.GET_ALL_USERS, users.getAllConnectedUsers());
      socket.emit(EVENTS.GET_CURRENT_BOARD, gameOfLife.board);
    });

    socket.on(EVENTS.USER_ENTER_GAME, (username = 'Shy Guy') => {
      const newUser = users.setUser(socket.id, username);
      socket.broadcast.emit(EVENTS.USER_JOIN, newUser);
      socket.emit(EVENTS.GET_SELF, newUser);
      socket.emit(EVENTS.GET_ALL_USERS, users.getAllConnectedUsers());
      socket.emit(EVENTS.GET_CURRENT_BOARD, gameOfLife.board);
    });

    socket.on(EVENTS.CLICK_BOARD, (col: number, row: number) => {
      const user = users.users[socket.id];
      const { colorR, colorB, colorG } = user;
      const formatData = [{
        row,
        col,
        color: {
          colorR,
          colorB,
          colorG,
        },
      }];

      gameOfLife.updateBoard(formatData);
      socket.broadcast.emit(EVENTS.BOARD_UPDATE, gameOfLife.board);
    });


    socket.on(EVENTS.DISCONNECT, () => {
      const user = users.users[socket.id];
      if (user) {
        users.disconnectUser(socket.id);
        socket.broadcast.emit(EVENTS.USER_LEFT, socket.id);
        setTimeout(() => {
          if (!user.isConnected) {
            users.removeUser(socket.id);
          }
        }, 30000);
      }
      if (users.getCountOfConnectedUsers() === 0) {
        gameOfLife.setInitialBoard();
      }
      console.log(`Connection ${socket.id} has left the building`);
    });
  });
};

export default init;
