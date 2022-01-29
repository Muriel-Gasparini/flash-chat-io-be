import { Request, Response } from "express";

import { BaseController, IBaseHttpController } from "../../core/http";
import { UserRepository } from "../../database/repositories/user/user-repository";

interface ISignUpController extends IBaseHttpController {
  userRepository: UserRepository
}

class SignUpController extends BaseController implements ISignUpController {
  userRepository: UserRepository;

  constructor(
    httpRequest: Request,
    httpResponse: Response,
    userRepository: UserRepository
  ) {
    super(httpRequest, httpResponse)
    this.userRepository = userRepository
  }

  async controller(): Promise<void> {
    try {
      const { user, error } = await this.userRepository.create(this.request.body)
      
      if (error) {
        return this.httpResponseHandler.badRequest(error)
      }

      this.httpResponseHandler.created({ user })
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        this.httpResponseHandler.internalError(error)
      }
    }
  }
}

const useSignUpController = (request: Request, response: Response) => {
  const userRepository = new UserRepository()
  new SignUpController(request, response, userRepository).controller()
}

export { SignUpController, useSignUpController }
