import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidatorOptions } from 'class-validator';
import * as session from 'express-session';

import { SessionData } from 'express-session';

interface CustomSession extends SessionData {
  userId: string;
  password: string;
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}

bootstrap();
