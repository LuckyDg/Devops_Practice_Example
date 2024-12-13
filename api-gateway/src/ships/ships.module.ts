import { Module } from '@nestjs/common';
import { ShipsController } from './ships.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, SHIP_SERVICE } from 'src/config';

@Module({
  controllers: [ShipsController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: SHIP_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${envs.rabbitmq_user}:${envs.rabbitmq_pass}@${envs.rabbitmq_host}:${envs.rabbitmq_port}`],
          queue: 'ships_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
})
export class ShipsModule {}
