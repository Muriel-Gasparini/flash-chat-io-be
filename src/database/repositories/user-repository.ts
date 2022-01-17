import { createJwtService } from '../../services/jsonWebToken/JwtService'
import User, { IUser } from '../models/user'

class UserRepository {

  async create(data: IUser): Promise<void | Error | IUser> {
    try {
      return await User.create(data)
    } catch (error) {
      if (error instanceof Error && error.toString().match(/duplicate/)) throw 'Email already exists'
      throw error
    }
  }

  async findByEmail(email: string, selectPassword?: boolean): Promise<IUser> {
    const user = !selectPassword ? await User.findOne({ email }) : await User.findOne({ email }).select('+password')

    if (!user) {
      throw new Error('This email does not exist')
    }

    return user
  }

  async findById(id: string, selectPassword?: boolean): Promise<IUser | undefined> {
    const user = !selectPassword ? await User.findOne({ _id: id }) : await User.findOne({ _id: id }).select('+password')

    if (!user) {
      throw new Error('This account does not exist')
    }

    return user
  }

  async getUserByToken(headerAuthorization: string | undefined): Promise<IUser | undefined> {
    try {
      if (!headerAuthorization) {
        throw 'Invalid Token'
      }

      const jwtService = createJwtService()
      const userRepository = new UserRepository()

      const tokenPrefix = 'Bearer '
      const userToken = headerAuthorization?.replace(tokenPrefix, '') || ''

      const { data } = await jwtService.getTokenPayload(userToken)

      const userAccount = await userRepository.findById(data)

      return userAccount
    } catch (error) {
      throw error
    }
  }
}

export { UserRepository }
