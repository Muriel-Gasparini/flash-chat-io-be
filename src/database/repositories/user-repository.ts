import { Document } from 'mongoose'
import User from '../models/user'

interface IUser {
  name: string
  email: string
  birthdate: Date
  password: string
}

class UserRepository {

  async create (data: IUser): Promise<void | Error | Document<IUser>> {
    try {
      return await User.create(data)
    } catch (error) {
      if (error.toString().match(/duplicate/)) throw 'Email already exists'
      throw new Error(error)
    }
  }
}

export { UserRepository }
