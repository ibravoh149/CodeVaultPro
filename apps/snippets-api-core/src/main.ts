import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { resolve } from 'path';
import { register } from 'tsconfig-paths';


register({
  baseUrl: resolve(__dirname, '..'), // Adjust based on your project structure
  paths: {
    '@app/*': ['src/*'],
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ validationError: { target: true, value: true } }),
  );
  await app.listen(3002);
}
bootstrap();
