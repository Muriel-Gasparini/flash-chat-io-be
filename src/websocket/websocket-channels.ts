import { Namespace, Server } from "socket.io";

import { globalChatChannel } from "./channels/global-chat-channel";
import { authMiddleware } from "./middlewares/auth";

interface WS_CHANNELS_PATH {
  GLOBAL_CHAT: string
};

interface WS_CHANNELS {
  GLOBAL_CHAT: Namespace
}

class WebsocketChannels {
  private server: Server;

  CHANNELS_PATH: WS_CHANNELS_PATH = {
    GLOBAL_CHAT: '/chat/global'
  };

  CHANNELS: WS_CHANNELS;

  constructor(server: Server) {
    this.server = server
    this.CHANNELS = {
      GLOBAL_CHAT: this.server.of(this.CHANNELS_PATH.GLOBAL_CHAT)
    }
  }

  initializeChannels() {
    this.CHANNELS.GLOBAL_CHAT.use(authMiddleware)
    this.CHANNELS.GLOBAL_CHAT.on('connection', globalChatChannel)
  }
}

export { WebsocketChannels }
