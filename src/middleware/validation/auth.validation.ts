import { body } from 'express-validator'

export const authValidation = [
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
]
