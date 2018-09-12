module.exports = (io, rooms) => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    const gameRoom = socket.handshake.headers.referer
    socket.join(gameRoom)

    if (!rooms[gameRoom]) {
      rooms[gameRoom] = {players: [socket.id], game: {}}
    } else {
      rooms[gameRoom].players.push(socket.id)
    }

    let room = rooms[gameRoom]

    // if (!room.started) {
    //   socket.emit('get-name')
    // }

    // socket.on('send-name', name => {
    //   room.players.push(name)
    //   console.log('Players:', room.players)
    //   const data = {room, name}
    //   socket.emit('save-name', data)
    // })

    socket.on('start', game => {
      let hands = {}
      for (let player of room.players) {
        hands[player] = []
        let i = 0
        while (i < 5) {
          const card = game.deck.shift()
          hands[player].push(card)
          i++
        }
      }
      game.hands = hands
      room.game = game
      room.counter = 0
      room.turnsLeft = room.players.length
      room.playing = room.players[room.counter]
      io.to(gameRoom).emit('start', room)
      room.started = true
    })

    socket.on('turn', game => {
      room.game = game

      if (room.players[room.counter + 1]) {
        room.counter++
        room.playing = room.players[room.counter]
      } else {
        room.counter = 0
        room.playing = room.players[0]
      }

      if (!game.deck.length) {
        room.turnsLeft--
      }

      if (game.fuse === 0 || !room.turnsLeft) {
        io.to(gameRoom).emit('game-over', game)
      } else {
        console.log('game state:', room)
        io.to(gameRoom).emit('turn', room)
      }
    })

    socket.on('disconnect', () => {
      const index = room.players.indexOf(socket.id)
      room.players.splice(index, 1)
      console.log(`Connection ${socket.id} has left the building`)
      console.log('Remaining players:', room.players)
      if (!room.players.length) {
        room = undefined
      }
    })
  })
}
