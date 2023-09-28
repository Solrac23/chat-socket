import express from 'express'
import http from 'http'
import path from 'path'
import mongoose from 'mongoose'
import {Server} from 'socket.io'
import cors from 'cors'
import { routes } from './routes'
// const Chat = require('./model/Chat')

const app = express()
const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

try {
  mongoose.connect('mongodb+srv://Chat-socket:Mistake132021@cluster0.gwqdx.mongodb.net/chat?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}catch(err){
  console.error(err)
}

app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	optionsSuccessStatus: 200,
	credentials: true
}))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(routes)
// app.use(express.json())

export {serverHttp, io}
