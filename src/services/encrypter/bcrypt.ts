import { hash, compare } from 'bcryptjs'
import { variables } from '../../config/envs'

interface IBcryptService {
  crypt(text: string): Promise<string>
  decrypt(textToCompare: string, hashedString: string): Promise<boolean>
}
class BcryptService implements IBcryptService{
  async crypt (data: string): Promise<string> {
    return hash(data, variables.hashSalt)
  }

  async decrypt (string: string, hashedString: string): Promise<boolean> {
    return await compare(string, hashedString)
  }
}

export { BcryptService }
