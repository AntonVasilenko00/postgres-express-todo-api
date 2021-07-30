import * as express from 'express'
import todoController, { updateMode } from '../controllers/todo.controller'

const todosRouter = express.Router()

todosRouter.post('/', todoController.createTodo)
todosRouter.get('/', todoController.getAllTodos)
todosRouter.get('/:id', todoController.getSingleTodo)
todosRouter.put('/:id', todoController.updateTodo(updateMode.PUT))
todosRouter.patch('/:id', todoController.updateTodo(updateMode.PATCH))
todosRouter.delete('/:id', todoController.deleteTodo)

export default todosRouter
