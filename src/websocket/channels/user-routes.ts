import { Socket } from "socket.io";

import { messageChannel } from "./message";

const USER_CHANNELS_PATH = {
  MESSAGES: 'messages'
}

const USER_CHANNELS = {
  [USER_CHANNELS_PATH.MESSAGES]: messageChannel
}

const { MESSAGES } = USER_CHANNELS_PATH

async function setUserRoutes (socket: Socket): Promise<void> {
  console.log(`USER CONNECTED:  ${socket.id}`)
  socket.on(MESSAGES, (message) => USER_CHANNELS[MESSAGES](message, socket.data.user))
}


export {setUserRoutes}