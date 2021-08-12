import { NextFunction, Request, Response } from 'express'
import UserService from '../services/user.service'
import TodoService from '../services/todo.service'
import { Todo } from '../entity/todo.entity'

//Todo: create base controller

class TodoController {
  private getIDFromRequest = (req: Request) => Number(req.params.id)
  private getUserIDFromRequest = (req: Request) => Number(req.params.userID)

  private sendNoIdResponse = (res) =>
    res.status(404).send({ message: 'No item with such id' })

  createTodo = async (req: Request, res: Response) => {
    try {
      await TodoService.initRepo()
      const data = req.body
      const userID = this.getUserIDFromRequest(req)

      if (!data.userID && userID) data.userID = userID

      const todo = await TodoService.add(data)

      res.json(todo)
    } catch (e) {
      res.status(404).send({ message: e.message })
    }
  }

  getSingleTodo = async (req: Request, res: Response) => {
    try {
      await TodoService.initRepo()
      const id = this.getIDFromRequest(req)
      const todo = await TodoService.getSingle(id)

      if (!todo) this.sendNoIdResponse(res)

      res.json(todo)
    } catch (e) {
      res.status(404).send({ message: "Couldn't find a todo" })
    }
  }

  getAllTodos = async (req: Request, res: Response) => {
    try {
      await TodoService.initRepo()
      const userID = this.getUserIDFromRequest(req)

      if (!userID) {
        res.json(await TodoService.getAll())
      } else if (!(await UserService.getSingle(userID))) {
        res.status(404).send({ message: "Couldn't find user with such id" })
      } else {
        res.json(await TodoService.getAllByUserId(userID))
      }
    } catch (e) {
      res.status(404).send({ message: "Couldn't get todos" })
    }
  }

  putTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TodoService.initRepo()

      const id = this.getIDFromRequest(req)
      const { userID } = await TodoService.getSingle(id)

      const data = { ...req.body, userID }

      const todo = await TodoService.put(id, data)

      if (!todo) this.sendNoIdResponse(res)

      res.status(200).send(todo)
    } catch (e) {
      res.status(404).send({ message: e.message })
    }
  }

  patchTodo = async (req: Request, res: Response) => {
    try {
      await TodoService.initRepo()
      const data = req.body
      const id = this.getIDFromRequest(req)

      const todo = await TodoService.patch(id, data)
      if (!todo) this.sendNoIdResponse(res)

      res.status(200).send(todo)
    } catch (e) {
      res.status(404).send({ message: "Couldn't patch a todo" })
    }
  }

  deleteTodo = async (req: Request, res: Response) => {
    try {
      await TodoService.initRepo()
      const id = this.getIDFromRequest(req)
      const result = await TodoService.delete(id)

      if (!result.affected) this.sendNoIdResponse(res)

      res.status(200).send({ message: 'deleted successfully' })
    } catch (e) {
      res.status(404).send({ message: "Couldn't delete a todo" })
    }
  }
}

export default new TodoController()
