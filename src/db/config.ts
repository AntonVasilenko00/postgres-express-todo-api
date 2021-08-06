import { Todo } from '../entity/todo.entity'
import { ConnectionOptions } from 'typeorm'

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Todo],
  synchronize: true,
  logging: false,
} as ConnectionOptions
