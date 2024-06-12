import { Request, Response } from 'express';
import { ExampleService } from '../services/exampleService';

const exampleService = new ExampleService();

class ExampleController {
  async getExamples(req: Request, res: Response): Promise<void> {
    const { limit, offset } = (req as any).pagination;
    const { search } = (req as any);
    const { sort } = (req as any);
    const { filters } = (req as any);

    try {
      const examples = await exampleService.findExamples(filters, search, sort, limit, offset);
      res.json(examples);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export const exampleController = new ExampleController();
