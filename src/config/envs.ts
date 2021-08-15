import { config } from 'dotenv'

config()

const variables = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI || '',
  hashSalt: 12,
  jwtSecret: process.env.JWT_SECRET || '',
  websocketCorsOrigin: process.env.WEBSOCKET_CORS_ORIGIN
}

export {variables}
