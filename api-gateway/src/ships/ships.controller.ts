import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SHIP_SERVICE } from 'src/config';
import { CreateShipDto } from './dtos/create-ship.dto';
import { GetShipsDto } from './dtos/get-ships.dto';
import { catchError } from 'rxjs';

@Controller('ships')
export class ShipsController {
  constructor(
    @Inject(SHIP_SERVICE) private readonly shipClient: ClientProxy,
  ) {}

  @Post()
  async createShip(@Body() createShipDto: CreateShipDto) {
    return this.shipClient.send({ cmd: 'create_ship' }, createShipDto).pipe(
      catchError((err) => {
         throw new RpcException(err);
      })
    );
  }

  @Get()
  async getShips(@Query() query: GetShipsDto) {
    return this.shipClient.send({ cmd: 'get_ships' }, query).pipe(
      catchError((err) => {
         throw new RpcException(err);
      })
    );
  }

  @Get(':id')
  async getShip(@Param('id') id: string) {
    return this.shipClient.send({ cmd: 'get_ship' }, id).pipe(
      catchError((err) => {
         throw new RpcException(err);
      })
    );
  }
}
