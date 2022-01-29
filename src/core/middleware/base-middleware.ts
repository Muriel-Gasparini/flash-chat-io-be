import { NextFunction, Request, Response } from "express";
import { IBaseHttpController, BaseController } from "../http";

interface IBaseMiddleware extends IBaseHttpController {
  next: NextFunction
}

class BaseMiddleware extends BaseController implements IBaseMiddleware {
  next: NextFunction;

  constructor(httpRequest: Request, httpResponse: Response, next: NextFunction) {
    super(httpRequest, httpResponse);
    this.next = next
  }
}

export { BaseMiddleware, IBaseMiddleware }
