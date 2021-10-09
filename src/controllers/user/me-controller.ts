import { Request, Response } from "express";

import { UserRepository } from "../../database/repositories/user-repository";
import { createJwtService } from "../../services/jsonWebToken/JwtService";

async function meController(req: Request, res: Response) {
  try {
    const jwtService = createJwtService()
    const userRepository = new UserRepository()

    const userToken = req.headers.authorization?.replace('Bearer ', '')

    if (!userToken) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const { data } = await jwtService.getTokenPayload(userToken)

    const userAccount = await userRepository.findById(data)

    res.status(200).json(userAccount)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An internal error ocurred' })    
  }
}

export { meController }
