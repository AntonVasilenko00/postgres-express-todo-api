import dotenv from 'dotenv'

dotenv.config()

export default {
  port: Number(process.env.PORT) || 5000,
  hostname: process.env.hostname || 'localhost',
  jwt_secret: process.env.JWT_SECRET || 'SUPER_SECRET_KEY',
  jwt_exp: process.env.JWT_EXP || '5m',
}
