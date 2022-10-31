import { io } from "./index"

let messages:any = []

io.on('connection', socket => {
  console.log(`Socket connect: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`Socket disconnect: ${socket.id}`)
  })

  socket.emit('previousMessages', messages)

  socket.on('sendMessage', (data: any) => {
    messages.push(data)
    socket.broadcast.emit('receivedMessage', data)
  })
})
