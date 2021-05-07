import { Router, Express } from 'express'

import { SignInController } from '../controllers/user/sign-in-controller'
import { SignUpController } from '../controllers/user/sign-up-controller'
import { RequestBodyValidator } from '../middlewares/request-body-validation/request-validator'


function setRoutes (app: Express): void {
  const router = Router()

  router.use(RequestBodyValidator)

  router.post('/sign-up', SignUpController)
  router.post('/sign-in', SignInController)

  app.use('/', router)
}

export { setRoutes }
