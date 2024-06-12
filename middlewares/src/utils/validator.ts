import { check, ValidationChain } from 'express-validator';
import Joi from 'joi';

export const exampleValidator: ValidationChain[] = [
  check('name').isString().notEmpty().withMessage('Name must be a string and not empty'),
  check('age').isInt({ min: 1 }).withMessage('Age must be an integer and at least 1'),
];



export const exampleValidator2 = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().integer().min(1).required(),
});
