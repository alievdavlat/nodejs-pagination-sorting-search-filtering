import { Request, Response, NextFunction } from 'express';
import { sanitizeBody } from 'express-validator';

export function sanitize() {
  return [
    sanitizeBody('email').normalizeEmail(),
    sanitizeBody('name').trim().escape(),
    (req: Request, res: Response, next: NextFunction) => next()
  ];
}
