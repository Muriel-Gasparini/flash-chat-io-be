import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import { variables } from '../config/envs'
import { connectOnDatabase } from '../database/connection'
import { setMiddlewares } from './middlewares/set-middlewares'
import { setRoutes } from './routes'
import { setChannels } from '../websocket/set-channels'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: variables.websocketCorsOrigin
  }
})

connectOnDatabase()
setMiddlewares(app)
setRoutes(app)
setChannels(io)

server.listen(variables.port, () => console.log(`Server Online on Port ${variables.port}`))
