import mongoose, { Schema } from 'mongoose'

import { IUser } from './user'

export interface IMessage {
  id: string
  user: IUser
  text: string
}

const messageSchema = new Schema<IMessage>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Users'
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model<IMessage>('Messages', messageSchema)
