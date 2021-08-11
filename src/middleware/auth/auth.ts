import { UserRole } from '../../entity/user.entity'
import { NextFunction, Request, Response } from 'express'
import { JWTPayload } from '../../controllers/auth.controller'

const denyAccess = (res: Response) =>
  res.status(403).send({ message: 'Access Denied' })

export const authorize =
  (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JWTPayload

    if (!roles.includes(user.role)) denyAccess(res)

    return next()
  }

export const ensureUserIsAuthorOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as JWTPayload

  if (user.sub !== Number(req.params.userID) && user.role !== UserRole.Admin)
    denyAccess(res)

  return next()
}
