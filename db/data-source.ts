import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenvExpand.expand(dotenv.config());

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  // host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  // username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  // password: 'postgres',
  database: process.env.POSTGRES_DATABASE,
  // database: 'gsbackoffice',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  // synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
