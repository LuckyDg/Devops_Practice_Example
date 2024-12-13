import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';
import { ShipsModule } from './ships/ships.module';
import { Ship } from './ships/entities/ships.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db_host,
      port: envs.db_port,
      username: envs.db_user,
      password: envs.db_pass,
      database: envs.db_name,
      entities: [Ship],
      synchronize: true,
    }),
    ShipsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
