import { NextFunction, Request, Response } from 'express'
import * as UserService from '../services/user.service'
import { IUser, UserRole } from '../entity/user.entity'

//Todo: create base controller

class UserController {
  private getIdFromRequest = (req: Request) => Number(req.params.userID)

  private sendNoIdResponse = (res) =>
    res.status(404).send({ message: 'No item with such id' })

  createUser = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const User = await UserService.addUser(data)

      res.json(User)
    } catch (e) {
      res
        .status(404)
        .send({ message: 'A user with such email already exists.' })
    }
  }

  getSingleUser = async (req: Request, res: Response) => {
    try {
      const id = this.getIdFromRequest(req)
      const User = await UserService.getSingleUser(id)

      if (!User) this.sendNoIdResponse(res)

      res.json(User)
    } catch (e) {
      console.log(e)
      res.status(404).send({ message: "Couldn't find a User" })
    }
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const Users = await UserService.getAllUsers()

      res.json(Users)
    } catch (e) {
      res.status(404).send({ message: "Couldn't get Users" })
    }
  }

  putUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = req.user as IUser
      const data = req.body
      if (currentUser.role !== UserRole.Admin && data.hasOwnProperty('role'))
        return res.status(403).send({ message: 'Access Denied' })
      const id = this.getIdFromRequest(req)

      const User = await UserService.putUser(id, data)
      if (!User) this.sendNoIdResponse(res)

      res.status(200).send(User)
    } catch (e) {
      res.status(404).send({ message: e.message })
    }
  }

  patchUser = async (req: Request, res: Response) => {
    try {
      const currentUser = req.user as IUser

      const data = req.body

      if (currentUser.role !== UserRole.Admin && data.hasOwnProperty('role'))
        return res.status(403).send({ message: 'Access Denied' })

      const id = this.getIdFromRequest(req)

      const User = await UserService.patchUser(id, data)
      if (!User) this.sendNoIdResponse(res)

      res.status(200).send(User)
    } catch (e) {
      res
        .status(404)
        .send({ message: "Couldn't patch a User", error: e.detail })
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = this.getIdFromRequest(req)
      const result = await UserService.deleteUser(id)

      if (!result.affected) this.sendNoIdResponse(res)

      res.status(200).send({ message: 'deleted successfully' })
    } catch (e) {
      res.status(404).send({ message: "Couldn't delete a User" })
    }
  }
}

export default new UserController()
