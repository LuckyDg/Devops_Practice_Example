import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Ms-Reports');

  const app = await NestFactory.createMicroservice(AppModule, {
    name: 'SHIP_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${envs.rabbitmq_user}:${envs.rabbitmq_pass}@${envs.rabbitmq_host}:${envs.rabbitmq_port}`],
      queue: 'ships_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  logger.log(`Ms Ships Running on port ${envs.port} 👾`);
}
bootstrap();
