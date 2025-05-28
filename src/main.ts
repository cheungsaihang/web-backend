import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DTOValidationPipe } from 'libs/dto-validation/dto-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new DTOValidationPipe());
  await app.listen(3000);
}
bootstrap();
