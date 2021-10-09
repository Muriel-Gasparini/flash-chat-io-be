import { Router, Express } from 'express'

import { meController } from '../controllers/user/me-controller'
import { SignInController } from '../controllers/user/sign-in-controller'
import { SignUpController } from '../controllers/user/sign-up-controller'
import { RequestBodyValidator } from '../middlewares/request-body-validation/request-validator'


function setRoutes (app: Express): void {
  const router = Router()

  router.get('/me', meController)
  router.post('/sign-up', RequestBodyValidator, SignUpController)
  router.post('/sign-in', RequestBodyValidator, SignInController)

  app.use('/', router)
}

export { setRoutes }
