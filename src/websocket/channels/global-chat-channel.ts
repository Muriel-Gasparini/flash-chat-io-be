import { Socket } from "socket.io";

import { getAllGlobalMessages } from "./global-messages-channel";
import { messageChannel } from "./message";


async function globalChatChannel(socket: Socket) {
  console.log(`USER CONNECTED:  ${socket.id}`)

  const allMessages = await getAllGlobalMessages(socket)
  socket.join('chat')
  socket.emit('chat', allMessages)

  socket.on('chat', (message) => messageChannel(message, socket))
}

export { globalChatChannel }
