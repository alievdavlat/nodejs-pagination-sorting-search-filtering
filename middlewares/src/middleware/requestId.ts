import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function requestId(req: Request, res: Response, next: NextFunction): void {
  req.id = uuidv4();
  console.log(`Request ID: ${req.id}`);
  next();
}
