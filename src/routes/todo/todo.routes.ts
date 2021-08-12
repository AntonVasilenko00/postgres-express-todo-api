import express from 'express'
import todoController from '../../controllers/todo.controller'
import {
  patchValidation,
  postValidation,
  putValidation,
} from '../../middleware/validation/todos.validation'
import { validateRequest } from '../../middleware/validation/request.validation'

const todosRouter = express.Router({ mergeParams: true })

todosRouter.get('/', todoController.getAllTodos)
todosRouter.get('/:id', todoController.getSingleTodo)
todosRouter.delete('/:id', todoController.deleteTodo)
todosRouter.put('/:id', putValidation, validateRequest, todoController.putTodo)

todosRouter.post(
  '/',
  postValidation,
  validateRequest,
  todoController.createTodo
)

todosRouter.patch(
  '/:id',
  patchValidation,
  validateRequest,
  todoController.patchTodo
)

export default todosRouter
