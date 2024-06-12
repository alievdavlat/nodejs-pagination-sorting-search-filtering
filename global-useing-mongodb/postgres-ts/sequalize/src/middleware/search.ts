import { Request, Response, NextFunction } from 'express';

export function search(req: Request, res: Response, next: NextFunction): void {
  const searchQuery = req.query.search || '';
  (req as any).search = searchQuery;
  next();
}
