import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log(socket.id)
  console.log('Connected!')
})

socket.on('get-name', () => {
  let name = prompt("What's your name?", 'Mr. Firework')
  if (!name) {
    name = 'Mr. Firework'
  }
  socket.emit('send-name', name)
})

export default socket
