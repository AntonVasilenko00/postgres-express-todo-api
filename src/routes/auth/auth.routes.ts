import * as express from 'express'
import AuthController from '../../controllers/auth.controller'
import { authValidation } from '../../middleware/validation/auth.validation'
import { validateRequest } from '../../middleware/validation/request.validation'
const authRouter = express.Router()

authRouter.post(
  '/signup',
  authValidation,
  validateRequest,
  AuthController.signUp
)
authRouter.post('/login', authValidation, validateRequest, AuthController.logIn)

export default authRouter
