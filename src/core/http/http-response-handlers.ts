import { Response } from "express";

interface IHttpResponseHandler {
  httpResponse: Response
  badRequest(error: Error): void
  internalError(error: Error): void
  created(content: any): void
  unauthorized(message: string): void
  success(content: any): void
}

class HttpResponseHandler implements IHttpResponseHandler {
  httpResponse: Response;

  constructor(httpResponse: Response) {
    this.httpResponse = httpResponse
  }

  badRequest(error: Error): void {
    this.httpResponse.status(400).json({ error: error.message })
  }

  created(content: any): void {
    this.httpResponse.status(201).json(content)
  }
  
  internalError(error: Error): void {   
    this.httpResponse.status(500).json({ error: error.message })
  }
  
  unauthorized(message: string): void {
    this.httpResponse.status(401).json({ error: message })
  }

  success(content: any): void {
    this.httpResponse.status(200).json(content)
  }
}

export { HttpResponseHandler, IHttpResponseHandler }
