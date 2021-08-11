import * as express from 'express'
import userController from '../../controllers/user.controller'
import todosRouter from '../todo/todo.routes'
import {
  authorize,
  ensureUserIsAuthorOrAdmin,
} from '../../middleware/auth/auth'
import { UserRole } from '../../entity/user.entity'
import { authValidation } from '../../middleware/validation/auth.validation'
import { validateRequest } from '../../middleware/validation/request.validation'
import { userPatchValidation } from '../../middleware/validation/users.validation'

const userRouter = express.Router()

userRouter.use('/:userID/todos', ensureUserIsAuthorOrAdmin, todosRouter)

userRouter.get('/', authorize([UserRole.Admin]), userController.getAllUsers)

userRouter.get(
  '/:userID',
  ensureUserIsAuthorOrAdmin,
  userController.getSingleUser
)

userRouter.post(
  '/',
  authorize([UserRole.Admin]),
  authValidation,
  validateRequest,
  userController.createUser
)

userRouter.patch(
  '/:userID',
  ensureUserIsAuthorOrAdmin,
  userPatchValidation,
  validateRequest,
  userController.patchUser
)

userRouter.put(
  '/:userID',
  ensureUserIsAuthorOrAdmin,
  authValidation,
  validateRequest,
  userController.putUser
)

userRouter.delete(
  '/:userID',
  ensureUserIsAuthorOrAdmin,
  userController.deleteUser
)

export default userRouter
