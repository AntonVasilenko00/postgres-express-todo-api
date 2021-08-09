import { IUser, User } from '../entity/user.entity'
import {
  addEntity,
  deleteEntity,
  getAllEntities,
  getSingleEntity,
  patchEntity,
  putEntity,
} from './base/base.service'
import { getRepository } from 'typeorm'

//Basic CRUD by id
const addUser = addEntity<IUser, User>(User)
const getAllUsers = getAllEntities<User>(User)
const getSingleUser = getSingleEntity<User>(User)
const putUser = putEntity<IUser, User>(User)
const patchUser = patchEntity<IUser, User>(User)
const deleteUser = deleteEntity<User>(User)

//Custom
const getUserByEmail = async (email: string): Promise<User> => {
  const repo = await getRepository(User)

  return repo.findOne({ where: { email: email } })
}

export {
  addUser,
  getAllUsers,
  getSingleUser,
  putUser,
  patchUser,
  deleteUser,
  getUserByEmail,
}
