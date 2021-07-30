import * as express from 'express'
import todosRouter from './todo.routes'

const rootRouter = express.Router()

rootRouter.use('/todos', todosRouter)

export default rootRouter
