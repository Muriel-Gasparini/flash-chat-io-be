import { config } from 'dotenv'

config()

const variables = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || '',
  hashSalt: 12
}

export {variables}