import { Types } from 'mongoose'
import User, { IUser } from '../../models/user'

export interface IUserRepositoryResponse {
  users?: IUser[]
  user?: IUser
  error?: Error
}

export interface IUserRepository {
  create(data: IUser): Promise<IUserRepositoryResponse>
  findByEmail(email: string, selectPassword: boolean): Promise<IUserRepositoryResponse>
  findById(id: string, selectPassword: boolean): Promise<IUserRepositoryResponse>
}

class UserRepository implements IUserRepository {

  async create(data: IUser): Promise<IUserRepositoryResponse> {
    try {
      const userCreated = await User.create(data)

      const user = await User.aggregate<IUser>([
        { "$match": { email: userCreated.email } },
        {
          "$project": {
            id: "$_id",
            name: 1,
            email: 1,
            birthdate: 1,
            photo: 1,
            createdAt: 1,
            updatedAt: 1
          }
        },
        {
          "$project": {
            _id: 0,
            password: false,
          }
        }
      ])

      return { user: user[0] }
    } catch (error) {
      if (error instanceof Error && error.toString().match(/duplicate/)) {
        return { error: new Error('Email already exists') }
      }
      throw error
    }
  }

  async findByEmail(email: string, selectPassword = false): Promise<IUserRepositoryResponse> {
    const user = await User.aggregate<IUser>([
      { "$match": { email } },
      {
        "$project": {
          id: "$_id",
          _id: 0,
          password: {
            "$cond": {
              if: selectPassword, then: "$password", else: '$$REMOVE'
            }
          },
          name: 1,
          email: 1,
          birthdate: 1,
          photo: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ])

    if (user.length === 0) {
      return { error: new Error("This email does not exist") }
    }

    return { user: user[0] }
  }

  async findById(id: string, selectPassword = false): Promise<IUserRepositoryResponse> {
    const user = await User.aggregate<IUser>([
      { "$match": { _id: Types.ObjectId(id) } },
      {
        "$project": {
          id: "$_id",
          _id: 0,
          password: {
            "$cond": {
              if: selectPassword, then: "$password", else: '$$REMOVE'
            }
          },
          name: 1,
          email: 1,
          birthdate: 1,
          photo: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ])

    if (user.length === 0) {
      return { error: new Error('This account does not exist') }
    }

    return { user: user[0] }
  }
}

export { UserRepository }
