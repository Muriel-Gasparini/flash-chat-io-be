import { hash, compare } from 'bcryptjs'
import { variables } from '../../config/envs'

class BcryptService {
  
  static async hashString (data: string): Promise<string> {
    return hash(data, variables.hashSalt)
  }

  static async compareHashedString (string: string, hashedString: string): Promise<boolean> {
    return await compare(string, hashedString)
  }
}

export { BcryptService }
