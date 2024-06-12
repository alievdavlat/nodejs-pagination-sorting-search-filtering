import { Request, Response, NextFunction } from 'express';

export function paginate(req: Request, res: Response, next: NextFunction): void {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    (req as any).pagination = { limit, skip };
    next();
}
