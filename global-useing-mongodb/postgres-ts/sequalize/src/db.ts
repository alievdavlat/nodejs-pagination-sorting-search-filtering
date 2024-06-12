import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('yourdbname', 'yourusername', 'yourpassword', {
  host: 'localhost',
  dialect: 'postgres',
});
