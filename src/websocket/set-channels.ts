import { Server } from "socket.io";

import { setUserRoutes } from "./channels/user-routes";
import { authMiddleware } from "./middlewares/auth";

const CHANNELS_PATH = {
  CONNECTION: 'connection'
}

function setChannels(server: Server): void {
  server.use(authMiddleware)
  server.on(CHANNELS_PATH.CONNECTION, setUserRoutes)
}

export { setChannels }
