import * as dotenv from 'dotenv'
import { UserRole, User } from '../../entity/user.entity'
import { getRepository } from 'typeorm'

dotenv.config()

export const createRootAdmin = async (): Promise<User> => {
  const email = process.env.ROOT_ADMIN_EMAIL
  const password = process.env.ROOT_ADMIN_PASSWORD
  const role = UserRole.Admin

  const repo = await getRepository(User)
  const newItem = repo.create({ email, password, role })

  return repo.save(newItem)
}
