import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

interface ExampleAttributes {
  id: number;
  name: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ExampleCreationAttributes extends Optional<ExampleAttributes, 'id'> {}

class Example extends Model<ExampleAttributes, ExampleCreationAttributes> implements ExampleAttributes {
  public id!: number;
  public name!: string;
  public age!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Example.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'examples',
  }
);

export { Example };
