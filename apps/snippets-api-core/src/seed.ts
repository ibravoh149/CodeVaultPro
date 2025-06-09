import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seedData/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });
  const seedService = app.get(SeedService);
  await seedService.seed();
  await app.close();
}

bootstrap();
