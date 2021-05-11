import User, { IUser } from '../models/user'

class UserRepository {

  async create (data: IUser): Promise<void | Error | IUser> {
    try {
      return await User.create(data)
    } catch (error) {
      if (error.toString().match(/duplicate/)) throw 'Email already exists'
      throw new Error(error)
    }
  }

  async findByEmail(email: string): Promise<IUser> {
    try {
      const user = await User.findOne({ email })

      if (!user) {
        throw new Error('This email does not exist')
      }

      return user
    } catch (error) {
      return error
    }
  }
}

export { UserRepository }
