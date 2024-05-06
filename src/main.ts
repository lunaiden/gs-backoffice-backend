import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as cookieParser from 'cookie-parser';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.FRONT_URL, credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
