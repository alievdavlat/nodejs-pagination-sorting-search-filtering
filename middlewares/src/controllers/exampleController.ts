import { Request, Response } from 'express';

class ExampleController {
  public async createExample(req: Request, res: Response): Promise<void> {
    const { name, age } = req.body;
    const message = req.t('example.created', { name, age });
    res.status(201).json({ message });

  }

  public async getExamples(req: Request, res: Response): Promise<void> {
    const { filters, sort } = req as any;
    // Assume you have a function to get examples with filters and sorting
    const examples = await this.fetchExamplesWithFiltersAndSorting(filters, sort);
    res.json(examples);
  }

  private async fetchExamplesWithFiltersAndSorting(filters: any, sort: any): Promise<any> {
    // Implement your logic to fetch data with filters and sorting
    return [];
  }

}

export const exampleController = new ExampleController();
