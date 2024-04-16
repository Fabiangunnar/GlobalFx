import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('Bittrade');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000, () => {
    logger.log('Bittrade api is running on ' + 5000);
  });
}
bootstrap();
