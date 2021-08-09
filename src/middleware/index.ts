import { Express } from 'express'
import { jsonParser, parser } from './parser'
import logger from './logger'
import * as passport from 'passport'
import { LoginStrategy, SignUpStrategy, JWTStrategy } from './auth/auth'

export const applyMiddleware = (app: Express) => {
  app.use(parser)
  app.use(jsonParser)
  app.use(logger)

  app.use(passport.initialize())
  passport.use('signup', SignUpStrategy)
  passport.use('login', LoginStrategy)
  passport.use('jwt', JWTStrategy)
}
