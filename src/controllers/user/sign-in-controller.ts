import { Request, Response } from "express";
import { IBaseHttpController, BaseController } from "../../core/http";
import { UserRepository } from "../../database/repositories/user";
import { BcryptService } from "../../services/encrypter/bcrypt";
import { JwtService } from "../../services/JsonWebToken/JwtService";

interface ISignInController extends IBaseHttpController {
  userRepository: UserRepository
  bcryptService: BcryptService
  jwtService: JwtService
}

class SignController extends BaseController implements ISignInController {
  userRepository: UserRepository;
  bcryptService: BcryptService;
  jwtService: JwtService;

  constructor(
    httpRequest: Request,
    httpResponse: Response,
    userRepository: UserRepository,
    bcryptService: BcryptService,
    jwtService: JwtService
  ) {
    super(httpRequest, httpResponse)
    this.userRepository = userRepository
    this.bcryptService = bcryptService
    this.jwtService = jwtService
  }
  
  async controller() {
    try {
      const getUserPassword = true
      const { user, error } = await this.userRepository.findByEmail(this.request.body.email, getUserPassword)
  
      if (error || !user) {
        error && this.httpResponseHandler.badRequest(error)
        return
      }
  
      const isPasswordValid = await this.bcryptService.decrypt(this.request.body.password, user.password)
  
      if (!isPasswordValid) {
        this.httpResponseHandler.unauthorized("Senha incorreta!")
        return
      }
      
      const token = this.jwtService.createToken({ data: user.id })
      
      this.httpResponseHandler.success({ token, id: user.id })
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {   
        this.httpResponseHandler.internalError(error)
      }
    }
  }
}

const useSignInController = (request: Request, response: Response) => {
  const userRepository = new UserRepository()
  const bcryptService = new BcryptService()
  const jwtService = new JwtService()
  new SignController(request, response, userRepository, bcryptService, jwtService).controller()
}

export { SignController, useSignInController }
