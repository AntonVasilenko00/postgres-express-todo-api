import * as express from 'express'
import userController from '../../controllers/user.controller'
import todosRouter from '../todo/todo.routes'
import {
  authorize,
  ensureUserIsAuthorOrAdmin,
} from '../../middleware/auth/auth'
import { UserRole } from '../../entity/user.entity'

const userRouter = express.Router()

userRouter.use('/:userID/todos', ensureUserIsAuthorOrAdmin, todosRouter)

userRouter.get('/', authorize([UserRole.Admin]), userController.getAllUsers)
userRouter.post('/', authorize([UserRole.Admin]), userController.createUser)

userRouter.get(
  '/:userID',
  ensureUserIsAuthorOrAdmin,
  userController.getSingleUser
)

userRouter.delete(
  '/:userID',
  ensureUserIsAuthorOrAdmin,
  userController.deleteUser
)

userRouter.patch(
  '/:userID',
  ensureUserIsAuthorOrAdmin,
  userController.patchUser
)

userRouter.put('/:userID', ensureUserIsAuthorOrAdmin, userController.putUser)

export default userRouter
