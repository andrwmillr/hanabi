module.exports = (io, rooms) => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    const gameRoom = socket.handshake.headers.referer;
    socket.join(gameRoom);

    socket.on('send-name', name => {
      let room = rooms[gameRoom];
      if (!room) {
        rooms[gameRoom] = { players: [{ id: socket.id, name }], game: {} };
        room = rooms[gameRoom];
      } else if (!room.started) {
        room.players.push({ id: socket.id, name });
      }
      if (!room.started) {
        io.to(gameRoom).emit('add-player', room);
      }
    });

    socket.on('start', game => {
      let room = rooms[gameRoom];
      if (room.started) {
        socket.emit('start', room);
      } else {
        let hands = {};
        for (let player of room.players) {
          hands[player.id] = [];
          let i = 0;
          while (i < 5) {
            const card = game.deck.shift();
            hands[player.id].push(card);
            i++;
          }
        }
        game.hands = hands;
        room.game = game;
        room.counter = 0;
        room.turnsLeft = room.players.length;
        room.playing = room.players[room.counter];
        io.to(gameRoom).emit('start', room);
        room.started = true;
      }
    });

    socket.on('turn', game => {
      let room = rooms[gameRoom];
      room.game = game;

      if (room.players[room.counter + 1]) {
        room.counter++;
        room.playing = room.players[room.counter];
      } else {
        room.counter = 0;
        room.playing = room.players[0];
      }

      if (!game.deck.length) {
        room.turnsLeft--;
      }

      if (game.fuse === 0 || !room.turnsLeft) {
        io.to(gameRoom).emit('game-over', game);
      } else {
        io.to(gameRoom).emit('turn', room);
      }
    });

    socket.on('disconnect', () => {
      let room = rooms[gameRoom];
      console.log(`Connection ${socket.id} has disconnected.`);
      if (room && room.players.length) {
        const disconnectedPlayer = room.players.find(
          player => player.id === socket.id
        );
        const index = room.players.indexOf(disconnectedPlayer);
        room.players.splice(index, 1);
        room.started = false;
        if (!room.players.length) {
          rooms[gameRoom] = undefined;
        }
      }
    });
  });
};
