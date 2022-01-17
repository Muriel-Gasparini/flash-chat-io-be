import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import { variables } from '../config/envs'
import { connectOnDatabase } from '../database/connection'
import { setMiddlewares } from './middlewares/set-middlewares'
import { setRoutes } from './routes'
import { WebsocketChannels } from '../websocket/websocket-channels'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

const websocketChannels = new WebsocketChannels(io)

connectOnDatabase()
setMiddlewares(app)
setRoutes(app)
websocketChannels.initializeChannels()

server.listen(variables.port, () => console.log(`Server Online on Port ${variables.port}`))
