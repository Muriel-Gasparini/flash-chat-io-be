import { hash } from 'bcryptjs'
import { variables } from '../../config/envs'

class BcryptService {
  
  static async hashString (data: string): Promise<string> {
    return hash(data, variables.hashSalt)
  }
}

export { BcryptService }
