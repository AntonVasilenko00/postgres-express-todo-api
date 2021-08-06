import { NextFunction, Request, Response } from 'express'
import * as TodoService from '../services/todo.service'

class TodoController {
  private getIdFromRequest = (req: Request) => Number(req.params.id)

  private sendNoIdResponse = (res) =>
    res.status(404).send({ message: 'No item with such id' })

  createTodo = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const todo = await TodoService.addTodo(data)

      res.json(todo)
    } catch (e) {
      res.status(404).send({ message: e.message })
    }
  }

  getSingleTodo = async (req: Request, res: Response) => {
    try {
      const id = this.getIdFromRequest(req)
      const todo = await TodoService.getSingleTodo(id)

      if (!todo) this.sendNoIdResponse(res)

      res.json(todo)
    } catch (e) {
      res.status(404).send({ message: "Couldn't find a todo" })
    }
  }

  getAllTodos = async (req: Request, res: Response) => {
    try {
      const todos = await TodoService.getAllTodos()

      res.json(todos)
    } catch (e) {
      res.status(404).send({ message: "Couldn't get todos" })
    }
  }

  putTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      const id = this.getIdFromRequest(req)

      const todo = await TodoService.putTodo(id, data)
      if (!todo) this.sendNoIdResponse(res)

      res.status(200).send(todo)
    } catch (e) {
      res.status(404).send({ message: e.message })
    }
  }

  patchTodo = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const id = this.getIdFromRequest(req)

      const todo = await TodoService.patchTodo(id, data)
      if (!todo) this.sendNoIdResponse(res)

      res.status(200).send(todo)
    } catch (e) {
      res.status(404).send({ message: "Couldn't patch a todo" })
    }
  }

  deleteTodo = async (req: Request, res: Response) => {
    try {
      const id = this.getIdFromRequest(req)
      const result = await TodoService.deleteTodo(id)

      if (!result.affected) this.sendNoIdResponse(res)

      res.status(200).send({ message: 'deleted successfully' })
    } catch (e) {
      res.status(404).send({ message: "Couldn't delete a todo" })
    }
  }
}

export default new TodoController()
