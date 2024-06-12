import { AppDataSource } from '../db';
import { Example } from '../entities/example';
import { Like } from 'typeorm';

export class ExampleService {
  private exampleRepository = AppDataSource.getRepository(Example);

  async findExamples(filters: any, search: string, sort: any, limit: number, offset: number) {
    const where: any = {};
    if (search) {
      where.name = Like(`%${search}%`);
    }

    for (const [key, value] of Object.entries(filters)) {
      where[key] = value;
    }

    return this.exampleRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { [sort.sortField]: sort.sortOrder.toUpperCase() },
    });
  }
}
