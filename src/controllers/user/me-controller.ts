import { Request, Response } from "express";

import { BaseController, IBaseHttpController } from "../../core/http";
import { UserRepository } from "../../database/repositories/user";

interface IMeController extends IBaseHttpController {
  userRepository: UserRepository
}

class MeController extends BaseController implements IMeController {
  userRepository: UserRepository;
  
  constructor(
    httpRequest: Request,
    httpResponse: Response,
    userRepository: UserRepository,
  ) {
    super(httpRequest, httpResponse)
    this.userRepository = userRepository
  }

  async controller() {
    try {
      const { userId } = this.response.locals
      
      const { user, error } = await this.userRepository.findById(userId)
  
      if (error) {
        this.httpResponseHandler.badRequest(error)
        return
      }

      this.httpResponseHandler.success({ user })
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        this.httpResponseHandler.internalError(error)
      }
    }
  }
}

const useMeController = (httpRequest: Request, httpResponse: Response) => {
  const userRepository = new UserRepository()
  new MeController(httpRequest, httpResponse, userRepository).controller()
}

export { MeController, useMeController }
