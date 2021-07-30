import { ConnectionOptions } from 'typeorm'
import * as path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()
const isCompiled = path.extname(__filename).includes('js')

export default {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'node_project',
  synchronize: !process.env.DB_NO_SYNC || true,
  logging: !process.env.DB_NO_LOGS || true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [`./models/**/*.${isCompiled ? 'js' : 'ts'}`],
  migrations: [`./db/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
  cli: {
    entitiesDir: './models',
    migrationsDir: './db/migration',
  },
} as ConnectionOptions
