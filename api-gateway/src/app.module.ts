import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ShipsModule } from './ships/ships.module';

@Module({
  imports: [AuthModule, ShipsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
