import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from './entities/ships.entity';

@Module({
  controllers: [ShipsController],
  providers: [ShipsService],
  imports: [
    TypeOrmModule.forFeature([Ship])
  ],
})
export class ShipsModule {}
