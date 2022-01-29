import { Router, Express } from 'express'

import { useMeController } from '../controllers/user/me-controller'
import { useSignInController } from '../controllers/user/sign-in-controller'
import { useSignUpController } from '../controllers/user/sign-up-controller'
import { useAuthMiddleware } from '../middlewares/auth/auth-middleware'
import { RequestBodyValidator } from '../middlewares/request-body-validation/request-validator'


function setRoutes (app: Express): void {
  const router = Router()

  router.get('/me', useAuthMiddleware, useMeController)
  router.post('/sign-up', RequestBodyValidator, useSignUpController)
  router.post('/sign-in', RequestBodyValidator, useSignInController)

  app.use('/', router)
}

export { setRoutes }
