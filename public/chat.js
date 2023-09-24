let socket = io('http://localhost:3833')

let chat = document.getElementById('chat')
let messages = document.querySelector('.messages')

function renderMessage(message) {
  // let divMessage = messages.insertAdjacentHTML('beforeend', '<div class="message"><strong>'+ message.username +'</strong>: '+ message.message +'</div>')
  let divMessage = document.createElement('div')
  divMessage.style.margin = "10px auto"
  divMessage.setAttribute('class', 'message')
  let strong = document.createElement('strong')
  strong.innerHTML = `${message.username}: `
  divMessage.appendChild(strong)
  messages.appendChild(divMessage)
  divMessage.insertAdjacentHTML('beforeend', `${message.message}<br>`)
}

socket.on('previousMessages', (messages) => {
  for(message of messages) {
    renderMessage(message)
  }
})

socket.on('receivedMessage', (message) => {
  renderMessage(message)
})

chat.addEventListener('submit', (e) => {
  e.preventDefault()
  
  let username = document.querySelector('input[name=username]').value
  let message = document.querySelector('input[name=message]').value

  if(username.length && message.length) {
    let messageObject = {
      username, 
      message,
    }

    renderMessage(messageObject)

    socket.emit('sendMessage', messageObject)
  }
})
