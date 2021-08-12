import { ITodo, Todo } from '../entity/todo.entity'
import { EntityService } from './base/base.service'

class TodoService extends EntityService<ITodo, Todo> {
  constructor() {
    super(Todo, { isCompleted: false }) //extend basic CRUD operations
  }

  public async getAllByUserId(userID: number): Promise<Todo[]> {
    return await super.getAll({ userID })
  }
}
export default new TodoService()

//old:
// //Basic CRUD
// const addTodo = addEntity<ITodo, Todo>(Todo)
// const getAllTodos = getAllEntities<Todo>(Todo)
// const getSingleTodo = getSingleEntity<Todo>(Todo)
// const putTodo = putEntity<ITodo, Todo>(Todo)
// const patchTodo = patchEntity<ITodo, Todo>(Todo)
// const deleteTodo = deleteEntity<Todo>(Todo)
//
// //Custom
// const getAllUserTodos = async (userID: number) =>
//   getAllEntities<Todo>(Todo, { userID })()
//
// export {
//   addTodo,
//   getAllTodos,
//   getSingleTodo,
//   putTodo,
//   patchTodo,
//   deleteTodo,
//   getAllUserTodos,
// }

//old (repetitive):
// export const addTodo = async (todo: ITodo): Promise<Todo> => {
//   const repo = await getRepository(Todo)
//   const newTodo = await repo.create(todo)
//
//   return repo.save(newTodo)
// }
// export const getAllTodos = async (): Promise<Todo[]> => {
//   const repo = await getRepository(Todo)
//
//   return repo.find()
// }
// export const getSingleTodo = async (id: number): Promise<Todo> => {
//   const repo = await getRepository(Todo)
//
//   return repo.findOne({ where: { id: id } })
// }
//
// export const putTodo = async (id: number, todo: ITodo): Promise<Todo> => {
//   const repo = await getRepository(Todo)
//   await repo.update(id, todo)
//
//   return repo.findOne(id)
// }
//
// export const patchTodo = async (id: number, todo: ITodo): Promise<Todo> => {
//   const repo = await getRepository(Todo)
//   await repo.update(id, todo)
//
//   return repo.findOne(id)
// }
//
// export const deleteTodo = async (id: number): Promise<DeleteResult> => {
//   const repo = await getRepository(Todo)
//
//   return repo.delete(id)
// }
