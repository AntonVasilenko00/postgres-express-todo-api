import { Request, Response } from 'express'
import { TryDBConnect } from '../db/helpers'

const tryDBConnect = async (req: Request, res: Response, next) => {
  await TryDBConnect(() => {
    res.json({
      error: 'Database connection error, please try again later',
    })
  }, next)
}
export default tryDBConnect
