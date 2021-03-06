import dotenv from 'dotenv'
import { UserRole, User } from '../../entity/user.entity'
import UserService from '../../services/user.service'

dotenv.config()

export const createRootAdmin = async (): Promise<User> => {
  const email = process.env.ROOT_ADMIN_EMAIL
  const password = process.env.ROOT_ADMIN_PASSWORD
  const role = UserRole.Admin

  return UserService.add({ email, password, role })
}
