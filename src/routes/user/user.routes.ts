import * as express from 'express'
import userController from '../../controllers/user.controller'

const userRouter = express.Router()

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getSingleUser)
userRouter.delete('/:id', userController.deleteUser)
userRouter.put('/:id', userController.putUser)
userRouter.post('/', userController.createUser)
userRouter.patch('/:id', userController.patchUser)

export default userRouter
