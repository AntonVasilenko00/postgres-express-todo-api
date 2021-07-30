import { Request, Response } from 'express'
import * as TodoService from '../services/todo.service'

export enum updateMode {
  PUT = 'PUT',
  PATCH = 'PATCH',
}

class TodoController {
  private getIdFromRequest = (req: Request) => Number(req.params.id)

  createTodo = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const todo = await TodoService.addTodo(data)
      res.json(todo)
    } catch (e) {
      res.json({ message: "Couldn't create a todo" })
    }
  }

  getSingleTodo = async (req: Request, res: Response) => {
    try {
      const id = this.getIdFromRequest(req)
      const todo = await TodoService.getSingleTodo(id)
      res.json(todo)
    } catch (e) {
      res.json({ message: "Couldn't find a todo" })
    }
  }

  getAllTodos = async (req: Request, res: Response) => {
    try {
      const todos = await TodoService.getAllTodos()
      res.json(todos)
    } catch (e) {
      res.json({ message: "Couldn't get todos" })
    }
  }

  updateTodo = (mode: updateMode) => async (req: Request, res: Response) => {
    try {
      const data = req.body
      const id = this.getIdFromRequest(req)
      const todo = await (mode === updateMode.PUT
        ? TodoService.putTodo(id, data)
        : TodoService.patchTodo(id, data))
      res.json(todo)
    } catch (e) {
      res.json({ message: "Couldn't update a todo" })
    }
  }

  deleteTodo = async (req: Request, res: Response) => {
    try {
      const id = this.getIdFromRequest(req)
      const todo = await TodoService.deleteTodo(id)
      res.json(todo)
    } catch (e) {
      res.json({ message: "Couldn't delete a todo" })
    }
  }
}

export default new TodoController()
