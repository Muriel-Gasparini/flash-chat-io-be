import mongoose from 'mongoose'
import { variables } from '../config/envs'

async function connectOnDatabase(): Promise<void> {
  try {
    await mongoose.connect(variables.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex: true })
    console.log('Connected on MongoDB')
  } catch (error) {
    console.log('MongoDB connection error: ', error)
    throw error
  }
}

export {connectOnDatabase}
