module.exports = (io, rooms) => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    let gameRoom = '';

    socket.on('get-rooms', () => {
      let openRooms = [];
      for (let name of Object.keys(rooms)) {
        let room = rooms[name];
        if (!room.started) {
          openRooms.push(name);
        }
      }
      socket.emit('send-rooms', openRooms);
    });

    socket.on('get-players', roomName => {
      const room = rooms[roomName];
      socket.emit('send-players', room.players);
    });

    socket.on('join-room', roomName => {
      const room = rooms[roomName];
      socket.join(roomName);
      gameRoom = roomName;
      socket.emit('send-players', room.players);
    });

    socket.on('create-room', roomName => {
      const newRoom = { name: roomName, players: [], game: {} };
      rooms[roomName] = newRoom;
      socket.join(roomName);
      gameRoom = roomName;
      const roomNames = Object.keys(rooms);
      socket.broadcast.emit('send-rooms', roomNames);
    });

    socket.on('send-name', name => {
      let room = rooms[gameRoom];
      if (room && !room.started) {
        room.players.push({ id: socket.id, name });
        io.to(gameRoom).emit('add-player', room.players);
      }
    });

    socket.on('start', game => {
      let room = rooms[gameRoom];
      if (room && room.players) {
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
        if (disconnectedPlayer) {
          const index = room.players.indexOf(disconnectedPlayer);
          room.players.splice(index, 1);
          room.started = false;
        }
      }
      if (!room || !room.players.length) {
        delete rooms[gameRoom];
      }
    });
  });
};
