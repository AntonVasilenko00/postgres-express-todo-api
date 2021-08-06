import { ITodo, Todo } from '../entity/todo.entity'
import { DeleteResult, getRepository } from 'typeorm'

export const addTodo = async (todo: ITodo): Promise<Todo> => {
  const repo = await getRepository(Todo)
  const newTodo = await repo.create(todo)

  return repo.save(newTodo)
}
export const getAllTodos = async (): Promise<Todo[]> => {
  const repo = await getRepository(Todo)

  return repo.find()
}
export const getSingleTodo = async (id: number): Promise<Todo> => {
  const repo = await getRepository(Todo)

  return repo.findOne({ where: { id: id } })
}

export const putTodo = async (id: number, todo: ITodo): Promise<Todo> => {
  const repo = await getRepository(Todo)
  await repo.update(id, todo)

  return repo.findOne(id)
}

export const patchTodo = async (id: number, todo: ITodo): Promise<Todo> => {
  const repo = await getRepository(Todo)
  await repo.update(id, todo)

  return repo.findOne(id)
}

export const deleteTodo = async (id: number): Promise<DeleteResult> => {
  const repo = await getRepository(Todo)

  return repo.delete(id)
}
