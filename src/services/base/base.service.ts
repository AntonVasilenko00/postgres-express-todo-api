import { DeleteResult, EntityTarget, getRepository, Repository } from 'typeorm'

const addEntity =
  <IEntity, Entity>(entity: EntityTarget<Entity>) =>
  async (item: IEntity): Promise<Entity> => {
    const repo = await getRepository(entity)
    const newItem = repo.create(item)

    return repo.save(newItem)
  }

const getAllEntities =
  <Entity>(entity: EntityTarget<Entity>, condition?: Record<string, unknown>) =>
  async (): Promise<Entity[]> => {
    const repo = await getRepository(entity)

    return repo.find(condition ? { where: condition } : {})
  }

const getSingleEntity =
  <Entity>(entity: EntityTarget<Entity>, condition?: Record<string, unknown>) =>
  async (id: number): Promise<Entity> => {
    const repo = await getRepository(entity)

    return repo.findOne({ where: condition ? condition : { id: id } })
  }

const putEntity =
  <IEntity, Entity>(entity: EntityTarget<Entity>) =>
  async (id: number, item: IEntity): Promise<Entity> => {
    const repo = await getRepository(entity)

    return repo.save({ ...item, id })
  }

const patchEntity =
  <IEntity, Entity>(entity: EntityTarget<Entity>) =>
  async (id: number, item: IEntity): Promise<Entity> => {
    const repo = await getRepository(entity)

    const patchedEntity = await repo.findOne(id)

    return repo.save(Object.assign(patchedEntity, item))
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

//REFACTORING
export type AnyObject = Record<string, unknown>

interface IEntityService<IEntity, Entity> {
  add: (item: IEntity) => Promise<Entity>
  getAll: (condition?: IEntity) => Promise<Entity[]>
  getSingle: (idOrCondition: number | AnyObject) => Promise<Entity>
  put: (id: number, item: IEntity) => Promise<Entity>
  patch: (id: number, item: IEntity) => Promise<Entity>
  delete: (id: number) => Promise<DeleteResult>
}

export class EntityService<IEntity, Entity>
  implements IEntityService<IEntity, Entity>
{
  protected entity: EntityTarget<Entity>
  protected repo: Repository<Entity>
  protected defaultValues: Partial<IEntity>

  constructor(
    entity: EntityTarget<Entity>,
    defaultValues: Partial<IEntity> = {}
  ) {
    this.entity = entity
    this.defaultValues = defaultValues
  }

  public async initRepo(): Promise<void> {
    this.repo = await getRepository(this.entity)
  }

  public async add(item: IEntity): Promise<Entity> {
    const newItem = this.repo.create(item)
    return this.repo.save(newItem)
  }

  public async getAll(condition?: AnyObject): Promise<Entity[]> {
    return this.repo.find(condition ? { where: condition } : {})
  }

  public async getSingle(idOrCondition: number | AnyObject): Promise<Entity> {
    switch (typeof idOrCondition) {
      case 'number':
        return this.repo.findOne(idOrCondition)
      default:
        return this.repo.findOne({ where: idOrCondition })
    }
  }

  public async put(id: number, item: IEntity): Promise<Entity> {
    return this.repo.save({ ...item, id, ...this.defaultValues })
  }

  public async patch(id: number, item: IEntity): Promise<Entity> {
    const patchedEntity = await this.repo.findOne(id)
    return this.repo.save(Object.assign(patchedEntity, item))
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id)
  }
}
