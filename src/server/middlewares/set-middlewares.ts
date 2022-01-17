import express, { Express } from 'express'
import { corsMiddleware } from './cors'
import { helmetMiddleware } from './helmet'

function setMiddlewares (app: Express): void {
  app.use(helmetMiddleware)
  app.use(corsMiddleware)
  app.use(express.json({limit: 5000000}))
}

export {setMiddlewares}
