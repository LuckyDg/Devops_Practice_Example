import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RcpCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Api-Gateway');
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  )
  
  app.useGlobalFilters(new RcpCustomExceptionFilter())
  await app.listen(envs.port);
  logger.log(`Api Gateway Running on port ${envs.port} 🛡️`);
}
bootstrap();
