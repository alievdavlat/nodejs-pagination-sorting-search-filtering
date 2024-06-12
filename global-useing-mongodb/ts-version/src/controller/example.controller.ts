import  {Example}  from '../model/example.model'
import { Request, Response } from 'express';

export default  {
  getAll :  async (req: Request, res: Response) => {
    const { limit, skip } = (req as any).pagination;
    const { search } = (req as any);
    const { sort } = (req as any);
    const { filters } = (req as any);

    const query = Example.find({ name: new RegExp(search, 'i'), ...filters })
        .limit(limit)
        .skip(skip)
        .sort(sort);

    const results = await query.exec();
    res.json(results);
  }
}