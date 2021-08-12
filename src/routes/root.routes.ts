import express from 'express'
import routes from './index'
import { validateRequest } from '../middleware/validation/request.validation'
import passport from 'passport'

const rootRouter = express.Router()

rootRouter.use('/todos', routes.todosRouter, validateRequest)
rootRouter.use('/auth', routes.authRouter)
rootRouter.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  routes.userRouter
)

export default rootRouter
