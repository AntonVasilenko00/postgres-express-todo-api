import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as _JWTStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../../services/user.service'

export const SignUpStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    await UserService.initRepo()
    try {
      const user = await UserService.add({ email, password })

      return done(null, user)
    } catch (error) {
      return done(null, false, { message: 'email already exists' })
    }
  }
)

export const LoginStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    await UserService.initRepo()
    try {
      const user = await UserService.getUserByEmail(email)

      if (!user) return done(null, false, { message: 'User not found' })

      const isValidCredentials = await user.isValidPassword(password)
      if (!isValidCredentials)
        return done(null, false, { message: 'Wrong Password' })

      return done(null, user, { message: 'Logged in Successfully' })
    } catch (error) {
      return done(error)
    }
  }
)

export const JWTStrategy = new _JWTStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    await UserService.initRepo()
    try {
      const user = await UserService.getSingle(token.sub)
      return done(null, user)
    } catch (err) {
      done(err)
    }
  }
)
