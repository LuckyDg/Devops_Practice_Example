import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { envs } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db_host,
      port: envs.db_port,
      username: envs.db_user,
      password: envs.db_pass,
      database: envs.db_name,
      entities: [User],
      synchronize: true,
    }),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
