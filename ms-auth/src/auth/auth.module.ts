import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
