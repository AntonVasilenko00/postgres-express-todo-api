import * as express from 'express'
import * as passport from 'passport'
import AuthController from '../../controllers/auth.controller'
const authRouter = express.Router()

authRouter.post('/signup', AuthController.signUp)
authRouter.post('/login', AuthController.logIn)

export default authRouter
