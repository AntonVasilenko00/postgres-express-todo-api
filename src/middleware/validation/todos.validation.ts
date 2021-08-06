import { body } from 'express-validator'

export const postValidation = [
  body('text').notEmpty().withMessage('Attribute text is required'),
  body('isCompleted')
    .isBoolean({ strict: true })
    .optional()
    .withMessage('Attribute must be type boolean'),
]

export const putValidation = [
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
