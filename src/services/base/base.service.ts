import { DeleteResult, EntityTarget, getRepository } from 'typeorm'

const addEntity =
  <IEntity, Entity>(entity: EntityTarget<Entity>) =>
  async (item: IEntity): Promise<Entity> => {
    const repo = await getRepository(entity)
    const newItem = repo.create(item)

    return repo.save(newItem)
  }

const getAllEntities =
  <Entity>(entity: EntityTarget<Entity>) =>
  async (): Promise<Entity[]> => {
    const repo = await getRepository(entity)

    return repo.find()
  }

const getSingleEntity =
  <Entity>(entity: EntityTarget<Entity>) =>
  async (id: number): Promise<Entity> => {
    const repo = await getRepository(entity)

    return repo.findOne({ where: { id: id } })
  }

const putEntity =
  <IEntity, Entity>(entity: EntityTarget<Entity>) =>
  async (id: number, item: IEntity): Promise<Entity> => {
    const repo = await getRepository(entity)

    await repo.update(id, item)

    return repo.findOne(id)
  }

const patchEntity =
  <IEntity, Entity>(entity: EntityTarget<Entity>) =>
  async (id: number, item: IEntity): Promise<Entity> => {
    const repo = await getRepository(entity)

    await repo.update(id, item)

    return repo.findOne(id)
  }

const deleteEntity =
  <Entity>(entity: EntityTarget<Entity>) =>
  async (id: number): Promise<DeleteResult> => {
    const repo = await getRepository(entity)

    return repo.delete(id)
  }

export {
  addEntity,
  getAllEntities,
  getSingleEntity,
  putEntity,
  patchEntity,
  deleteEntity,
}
