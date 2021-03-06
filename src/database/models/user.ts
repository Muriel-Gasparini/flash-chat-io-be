import mongoose, { Schema } from 'mongoose'

import { BcryptService } from '../../services/encrypter/bcrypt'

export interface IUser {
  id: string
  name: string
  email: string
  birthdate: Date
  password: string
  photo: string
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    dropDups: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  photo: {
    type: String,
    required: true
  }
}, { timestamps: true })

userSchema.pre<IUser>('save', async function (next): Promise<void> {
  const bcryptService = new BcryptService() 
  this.password = await bcryptService.crypt(this.password)
  return next()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
userSchema.post("save", (error: any, _doc: any, next: any): Error | void => {
  if (error.code === 11000) {
    throw error
  }
  next()
})

export default mongoose.model<IUser>('Users', userSchema)
