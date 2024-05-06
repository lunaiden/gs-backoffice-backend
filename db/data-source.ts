import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'node:fs';
dotenvExpand.expand(dotenv.config());

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  // host: process.env.POSTGRES_HOST,
  // host: 'localhost',
  // port: 5432,
  // username: process.env.POSTGRES_USER,
  // username: 'postgres',
  // password: process.env.POSTGRES_PASSWORD,
  // password: 'postgres',
  // database: process.env.POSTGRES_DATABASE,
  // database: 'gsbackoffice',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
