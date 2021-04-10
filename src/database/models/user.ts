import mongoose, { Document } from 'mongoose'
import { BcryptService } from '../../services/encrypter/bcrypt'

interface IUser extends Document {
  name: string,
  email: string
  birthdate: Date
  password: string
}

const userSchema = new mongoose.Schema({
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
    required: true
  }
})

userSchema.pre<IUser>('save', async function (next): Promise<void> {
  this.password = await BcryptService.hashString(this.password)
  return next()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
userSchema.post(/save/, (error: any, _doc: any, next: any): Error | void => {
  if (error.code === 11000) {
    console.log(error, _doc)
    throw error
  }
  next()
})

export default mongoose.model('Users', userSchema)
