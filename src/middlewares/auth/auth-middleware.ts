import { NextFunction, Request, Response } from "express";
import { BaseMiddleware, IBaseMiddleware } from "../../core/middleware/base-middleware";
import { JwtService } from "../../services/jsonWebToken/JwtService";

interface AuthMiddleware extends IBaseMiddleware {
  jwtService: JwtService
}

class AuthMiddleware extends BaseMiddleware implements AuthMiddleware {
  jwtService: JwtService;

  constructor(
    httpRequest: Request,
    httpResponse: Response,
    next: NextFunction,
    jwtService: JwtService
  ) {
    super(httpRequest, httpResponse, next);
    this.jwtService = jwtService
  }

  async controller() {
    try {
      const userToken = this.request.headers.authorization?.replace('Bearer ', '')
  
      if (!userToken) {
        this.httpResponseHandler.unauthorized("No token provided")
        return
      }
  
      const { data } = await this.jwtService.getTokenPayload(userToken)
  
      this.response.locals.userId = data
        
      this.next()
    } catch (error) {
      if (error instanceof Error) {
        this.httpResponseHandler.unauthorized(error.message)
      }
    }
  }
}

const useAuthMiddleware = (httpRequest: Request, httpResponse: Response, next: NextFunction) => {
  const jwtService = new JwtService()
  new AuthMiddleware(httpRequest, httpResponse, next, jwtService).controller()
}

export { AuthMiddleware, useAuthMiddleware }
