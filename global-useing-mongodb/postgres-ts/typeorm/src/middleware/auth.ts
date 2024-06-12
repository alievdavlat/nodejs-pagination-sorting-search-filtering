import { Request, Response, NextFunction } from 'express';

export function mockAuth(req: Request, res: Response, next: NextFunction): void {
  req.user = { id: 1, role: 'admin' };
  next();
}
