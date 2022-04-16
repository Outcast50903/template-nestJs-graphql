import { NestFactory } from '@nestjs/core';

import { SchemaValidationPipe } from './helpers/validations/schemaValidationPipe';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new SchemaValidationPipe());

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
