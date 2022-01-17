import { Socket } from "socket.io"
import { MessagesRepository } from "../../database/repositories/messages-repository"
import { getAllGlobalMessages } from "./global-messages-channel"

async function messageChannel (message: string, socket: Socket): Promise<void> {
  try {
    const userAccount = socket.data.user
    const messagesRepository = new MessagesRepository()

    console.log(`MESSAGE RECEIVED: ${message}`)
    console.log(`BY USER: ${userAccount.id}`)
    
    socket.data.message = {
      user: userAccount.id,
      text: message
    }

    await messagesRepository.create(socket.data.message)

    const allMessages = await getAllGlobalMessages(socket)

    socket.broadcast.emit('chat', allMessages)
  } catch (error) {
    console.log("ERROR: ", error)
    socket.emit('error', error)
  }
}

export { messageChannel }