import { Request, Response, NextFunction } from 'express';

export function filter(req: Request, res: Response, next: NextFunction): void {
    const filters: Record<string, any> = {};
    for (const key in req.query) {
        if (key !== 'page' && key !== 'limit' && key !== 'sortField' && key !== 'sortOrder' && key !== 'search') {
            filters[key] = req.query[key];
        }
    }
    (req as any).filters = filters;
    next();
}
