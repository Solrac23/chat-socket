import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

export default mongoose.model('Chat', ChatSchema)