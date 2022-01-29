import { sign, verify } from 'jsonwebtoken'
import { variables } from '../../config/envs'

interface jwtPayload {
  data?: object | string
  error?: Error
}

interface IJwtService {
  SECRET: string
  createToken (payload: jwtPayload ): string
  getTokenPayload (token: string): Promise<jwtPayload>
}

class JwtService implements IJwtService{

  SECRET = variables.jwtSecret

  createToken (payload: jwtPayload ): string {
    const jsonPayload = JSON.stringify(payload)
    return sign(jsonPayload, this.SECRET)
  }

  getTokenPayload (token: string): Promise<jwtPayload> {
    return new Promise((resolve, reject) => {

      verify(token, this.SECRET, (err, payload) => {
        if (err) reject(err)
      
        if (!payload) return reject('Token malformatted')

        if (Object.keys(payload).includes('data')) {
          resolve(payload)
        }
      })
    })
  }
}

const createJwtService = (): JwtService => {
  return new JwtService()
} 

export { JwtService, createJwtService }
