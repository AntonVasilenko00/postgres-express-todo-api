import { NextFunction, Request, Response } from 'express'
import * as passport from 'passport'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'
import { UserRole } from '../entity/user.entity'

export interface JWTPayload {
  sub: number //id
  role: UserRole
}

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('signup', (err, user, info) => {
      if (err) return next(err)

      if (!user) {
        res.status(401).send({ message: info.message })
        return
      }

      res.json({
        message: 'Signup successful',
        user: req.user,
      })
    })(req, res, next)
  }

  async logIn(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err) return next(err)

        if (!user) res.status(401).send({ message: info.message })

        req.login(user, { session: false }, async (err) => {
          if (err) return next(err)

          const payload: JWTPayload = { sub: user.id, role: user.role }
          const token = jwt.sign(payload, config.jwt_secret)

          return res.json({ token })
        })
      } catch (err) {
        return next(err)
      }
    })(req, res, next)
  }
}

export default new AuthController()
