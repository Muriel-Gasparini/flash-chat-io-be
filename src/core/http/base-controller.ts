import { Request, Response } from "express";
import { HttpResponseHandler, IHttpResponseHandler } from ".";

interface IBaseHttpController {
  request: Request
  response: Response
  httpResponseHandler: IHttpResponseHandler
  controller?(): Promise<void>
}

class BaseController implements IBaseHttpController {
  httpResponseHandler: HttpResponseHandler;
  response: Response;
  request: Request;

  constructor(httpRequest: Request, httpResponse: Response) {
    this.request = httpRequest
    this.response = httpResponse
    this.httpResponseHandler = new HttpResponseHandler(httpResponse)
  }
}

export { BaseController, IBaseHttpController }
