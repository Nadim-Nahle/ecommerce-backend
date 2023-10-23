import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*', // or '*' for any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['auth-api', 'Content-Type'],
  });
  await app.listen(3000);
}
bootstrap();
