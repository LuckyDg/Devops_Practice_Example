import { Controller } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateShipDto } from './dtos/create-ship.dto';
import { GetShipsDto } from './dtos/get-ships.dto';

@Controller()
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @MessagePattern({ cmd: 'create_ship' })
  async createShip(@Payload() createShipDto: CreateShipDto) {
    return this.shipsService.create(createShipDto);
  }

  @MessagePattern({ cmd: 'get_ships' })
  async getShips(@Payload() getShipsDto: GetShipsDto) {
    return this.shipsService.findAll(getShipsDto);
  }

  @MessagePattern({ cmd: 'get_ship' })
  async getShip(@Payload() id: string) {
    return this.shipsService.findById(id);
  }
}
