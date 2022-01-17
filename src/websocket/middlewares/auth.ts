import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

import { UserRepository } from "../../database/repositories/user-repository";

export interface NextSocketFunction {
  (err?: ExtendedError | undefined): void
}

async function authMiddleware(socket: Socket, next: NextSocketFunction): Promise<void> {
  try {
    const userRepository = new UserRepository()

    const authorizationToken = socket.handshake.auth?.token

    const userAccount = await userRepository.getUserByToken(authorizationToken)
    
    if (!userAccount) {
      throw { authError: 'You need to login' }
    }

    socket.data.user = userAccount
    next()
  } catch (error) {
    console.log(error)
    next(new Error("You need to login"));
  }
}

export { authMiddleware }
