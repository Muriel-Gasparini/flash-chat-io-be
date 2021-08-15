import { createJwtService } from '../../services/jsonWebToken/JwtService'
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
      throw new Error(error)
    }
  }

  async findById(id: string): Promise<IUser> {
    try {
      const user = await User.findOne({ _id: id })

      if (!user) {
        throw new Error('This account does not exist')
      }

      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUserByToken (headerAuthorization: string | undefined): Promise<IUser | undefined> {
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
      throw new Error(error)
    }
  }
}

export { UserRepository }
