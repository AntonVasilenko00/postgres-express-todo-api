import { getRepository } from 'typeorm'
import { createRootAdmin } from './createRootAdmin'
import { User } from '../../entity/user.entity'

export const seedDB = async (): Promise<void> => {
  const repo = await getRepository(User)
  const currentUsers = await repo.find({})

  if (!currentUsers.length) await createRootAdmin()
}
