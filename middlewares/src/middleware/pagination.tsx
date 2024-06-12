import { Request, Response, NextFunction } from 'express';

export const paginate = (req: Request, res: Response, next: NextFunction) => {
  let { page, size } = req.query;

  if (!page) {
    page = '1';
  }

  if (!size) {
    size = '10';
  }

  const limit = parseInt(size as string);
  const offset = (parseInt(page as string) - 1) * limit;

  req.pagination = { limit, offset };
  next();
};
