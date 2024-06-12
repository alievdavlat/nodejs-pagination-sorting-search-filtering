import { Request, Response, NextFunction } from 'express';

export function complexQuery(req: Request, res: Response, next: NextFunction): void {
  const filters: Record<string, any> = {};
  const sort: Record<string, any> = {};

  for (const key in req.query) {
    if (key.startsWith('filter_')) {
      const field = key.replace('filter_', '');
      filters[field] = req.query[key];
    }
    if (key.startsWith('sort_')) {
      const field = key.replace('sort_', '');
      sort[field] = req.query[key] === 'desc' ? 'DESC' : 'ASC';
    }
  }

  (req as any).filters = filters;
  (req as any).sort = sort;
  next();
}
