import { sign, verify } from 'jsonwebtoken'
import { variables } from '../../config/envs'

interface jwtPayload {
  data: string
}

class JwtService {

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
          resolve(JSON.parse(JSON.stringify(payload)))
        }
      })
    })
  }
}

const createJwtService = (): JwtService => {
  return new JwtService()
} 

export { JwtService, createJwtService }
