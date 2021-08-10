import { body, check } from 'express-validator'

export const postValidation = [
  check('userID').exists().withMessage('UserID is required'),
  body('text').exists().withMessage('Attribute text is required'),
  body('isCompleted')
    .isBoolean({ strict: true })
    .optional()
    .withMessage('Attribute must be type boolean'),
]

export const putValidation = [
  body('userID').exists().withMessage('Attribute UserID is required'),
  body('text').exists().withMessage('Attribute text is required'),
  body('isCompleted')
    .isBoolean({ strict: true })
    .optional()
    .withMessage('Attribute must be type boolean'),
]

export const patchValidation = [
  body('isCompleted')
    .isBoolean({ strict: true })
    .optional()
    .withMessage('Attribute must be type boolean'),
]
