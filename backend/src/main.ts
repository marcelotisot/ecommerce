import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TypeORMExceptionFilter } from './common';
import { environment } from './config';

export async function bootstrap() {
  const logger = new Logger('Main ts bootstrap');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();

  app.useGlobalFilters(new TypeORMExceptionFilter());

  await app.listen(environment.port);

  logger.log(`Server running on port ${environment.port}`);
}
bootstrap();
