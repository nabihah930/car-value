import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true       //Any other properties found in the req that are not included in our DTO will be stripped automatically
    })
  )
  await app.listen(3000);
}
bootstrap();
