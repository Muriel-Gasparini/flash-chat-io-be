import { Request, Response } from 'express'
import { UserRepository } from '../database/repositories/user-repository'

const userRepository = new UserRepository()

async function SignUpController (req: Request, res: Response): Promise<void> {
  try {
    const userAccount = await userRepository.create(req.body)
    res.status(201).json(userAccount)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })    
  }
}

export { SignUpController }
