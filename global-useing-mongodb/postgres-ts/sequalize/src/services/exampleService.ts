import { Example } from '../models/exampleModel';

export class ExampleService {
  async findExamples(filters: any, search: string, sort: any, limit: number, offset: number) {
    const where: any = {};
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    for (const [key, value] of Object.entries(filters)) {
      where[key] = value;
    }

    return Example.findAll({
      where,
      limit,
      offset,
      order: [[sort.sortField, sort.sortOrder]],
    });
  }
}
