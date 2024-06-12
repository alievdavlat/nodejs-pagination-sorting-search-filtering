import { Request, Response, NextFunction } from 'express';

export function sort(req: Request, res: Response, next: NextFunction): void {
  const sortField = req.query.sortField as string || 'createdAt';
  const sortOrder = req.query.sortOrder === 'asc' ? 'ASC' : 'DESC';

  (req as any).sort = { sortField, sortOrder };
  next();
}
