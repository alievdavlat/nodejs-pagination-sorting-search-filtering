import { DataSource } from 'typeorm';
import { Example } from './entities/example';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yourusername',
  password: 'yourpassword',
  database: 'yourdbname',
  entities: [Example],
  synchronize: true,
});
