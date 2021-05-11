import { Request, Response } from 'express'
import { UserRepository } from '../../database/repositories/user-repository'
import { BcryptService } from '../../services/encrypter/bcrypt'
import { createJwtService } from '../../services/JsonWebToken/JwtService'

const userRepository = new UserRepository()

async function SignInController (req: Request, res: Response): Promise<void> {
  try {
    const user = await userRepository.findByEmail(req.body.email)
    
    const passwordIsValid = await BcryptService.compareHashedString(req.body.password, user.password)

    if (!passwordIsValid) {
      res.status(400).json({ error: 'Senha incorreta!' })
    }

    const jwtService = createJwtService()

    const token = jwtService.createToken({ data: user.id })

    res.status(200).json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export { SignInController }
