const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

try {
  mongoose.connect('mongodb+srv://Chat-socket:Mistake132021@cluster0.gwqdx.mongodb.net/chat?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}catch(err){
  console.error(err)
}

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(express.json())
app.use(routes)

app.use('/', (req, res) => {
  res.render('index.html')
})

let messages = []

io.on('connection', socket => {
  console.log(`Socket connect: ${socket.id}`)

  socket.emit('previousMessages', messages)

  socket.on('sendMessage', data => {
    messages.push(data)
    socket.broadcast.emit('receivedMessage', data)
  })
})

server.listen(3833, () => {
  console.log('Server is running!!')
})