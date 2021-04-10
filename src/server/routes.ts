import { Router, Express } from 'express'

import { SignUpController } from '../controllers/sign-up-controller'
import { RequestBodyValidator } from '../middlewares/request-body-validation/request-validator'


function setRoutes (app: Express): void {
  const router = Router()

  router.use(RequestBodyValidator)

  router.post('/sign-up', SignUpController)

  app.use('/', router)
}

export { setRoutes }
