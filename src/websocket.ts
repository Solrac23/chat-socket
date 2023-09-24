import { io } from "./index"

interface IMessages {
	messages: string
}

let message:IMessages[] = []

io.on('connection', socket => {
  console.log(`Socket connect: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`Socket disconnect: ${socket.id}`)
  })

  socket.emit('previousMessages', message)

  socket.on('sendMessage', (data: any) => {
    message.push(data)
    socket.broadcast.emit('receivedMessage', data)
  })
})
