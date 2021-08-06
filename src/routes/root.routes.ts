import * as express from 'express'
import routes from './index'
import { validateRequest } from '../middleware/validation/requestValidation'

const rootRouter = express.Router()

rootRouter.use('/todos', routes.todosRouter, validateRequest)
rootRouter.use('/auth', routes.authRouter)

export default rootRouter
