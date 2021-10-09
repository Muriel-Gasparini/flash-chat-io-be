import { Socket } from "socket.io";
import { MessagesRepository } from "../../database/repositories/messages-repository";

async function getAllGlobalMessages (socket: Socket) {
  try {
    const messagesRepository = new MessagesRepository()

    const allMessages = await messagesRepository.findAllMessagesWithUserPopulated()

    const mappedMessages = allMessages.map(x => {
      return {
        messageId: x.id,
        user: x.user,
        message: x.text
      }
    })
    
    return mappedMessages
  } catch (error) {
    console.log("ERROR: ", error)
    socket.emit('error', new Error("Error on get all messages"))
  }
}

export { getAllGlobalMessages }
