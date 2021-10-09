import { Socket } from "socket.io";

import { getAllGlobalMessages } from "./global-messages-channel";
import { messageChannel } from "./message";

const ROUTES_PATH = {
  GLOBAL_MESSAGES: 'global_messages'
}

const USER_CHANNELS = {
  [ROUTES_PATH.GLOBAL_MESSAGES]: messageChannel
}

const { GLOBAL_MESSAGES } = ROUTES_PATH

async function setUserRoutes (socket: Socket): Promise<void> {
  console.log(`USER CONNECTED:  ${socket.id}`)

  const allMessages = await getAllGlobalMessages(socket)
  socket.join(GLOBAL_MESSAGES)
  socket.emit(GLOBAL_MESSAGES, allMessages)

  socket.on(GLOBAL_MESSAGES, (message) => USER_CHANNELS[GLOBAL_MESSAGES](message, socket))
}

export { setUserRoutes }
