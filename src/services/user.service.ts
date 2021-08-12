import { IUser, User } from '../entity/user.entity'
import { EntityService } from './base/base.service'

class UserService extends EntityService<IUser, User> {
  constructor() {
    super(User)
  }

  async getUserByEmail(email: string): Promise<User> {
    return super.getSingle({ email })
  }
}

export default new UserService()

//old:
// //Basic CRUD by id
// const addUser = addEntity<IUser, User>(User)
// const getAllUsers = getAllEntities<User>(User)
// const getSingleUser = getSingleEntity<User>(User)
// const putUser = putEntity<IUser, User>(User)
// const patchUser = patchEntity<IUser, User>(User)
// const deleteUser = deleteEntity<User>(User)
//
// //Custom
// const getUserByEmail = (email: string) =>
//   getSingleEntity<User>(User, { email })(null)
//
// export {
//   addUser,
//   getAllUsers,
//   getSingleUser,
//   putUser,
//   patchUser,
//   deleteUser,
//   getUserByEmail,
// }
