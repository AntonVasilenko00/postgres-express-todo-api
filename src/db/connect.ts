import 'reflect-metadata'
import dotenv from 'dotenv'
import { createConnection } from 'typeorm'
import connectionConfig from './config'

dotenv.config()

export default createConnection(connectionConfig)
