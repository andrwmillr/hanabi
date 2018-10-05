import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log(socket.id)
  console.log('Connected!')
})

socket.on('get-name', () => {
  let name = prompt("What's your name?")
  if (!name) {
    name = 'Hal'
  }
  socket.emit('send-name', name)
})

export default socket
