import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
    methods: ['GET', 'POST', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
    preflightContinue: false,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
