import { sign } from 'jsonwebtoken'
import { variables } from '../../config/envs'

interface jwtPayload {
  data: Record<string, unknown>
}

class JwtService {

  SECRET = variables.jwtSecret

  createToken (payload: jwtPayload ): string {
    return sign(payload, this.SECRET)
  }
}

const createJwtService = (): JwtService => {
  return new JwtService()
} 

export { JwtService, createJwtService }
