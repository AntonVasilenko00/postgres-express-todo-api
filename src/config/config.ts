import * as dotenv from 'dotenv'
dotenv.config()

export default {
  port: Number(process.env.PORT) || 1337,
  hostname: process.env.hostname || 'localhost',
}
