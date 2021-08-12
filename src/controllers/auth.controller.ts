import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { UserRole } from '../entity/user.entity'
import ms from 'ms'

export interface JWTPayload {
  sub: number //id
  role: UserRole
  expiresIn?: string
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

          const payload: JWTPayload = {
            sub: user.id,
            role: user.role,
            expiresIn: config.jwt_exp,
          }
          const token = jwt.sign(payload, config.jwt_secret, {
            expiresIn: config.jwt_exp,
          })

          return res.json({
            id: user.id,
            token,
            expiresIn: payload.expiresIn,
          })
        })
      } catch (err) {
        return next(err)
      }
    })(req, res, next)
  }
}

export default new AuthController()
