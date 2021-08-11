import { body } from 'express-validator'
import { UserRole } from '../../entity/user.entity'

const roleExists = (value: string) => {
  const roles: string[] = Object.values(UserRole)
  return roles.includes(value)
    ? true
    : Promise.reject('Such role does not exist')
}

export const userPatchValidation = [
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('role').optional().custom(roleExists),
]
