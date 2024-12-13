import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from './entities/ships.entity';
import {  Repository } from 'typeorm';
import { CreateShipDto } from './dtos/create-ship.dto';
import { GetShipsDto } from './dtos/get-ships.dto';

@Injectable()
export class ShipsService {
  constructor(
    @InjectRepository(Ship)
    private readonly shipRepository: Repository<Ship>,
  ) {}

  async create(createShipDto: CreateShipDto): Promise<Ship> {
    const newShip = this.shipRepository.create(createShipDto);
    const savedShip = await this.shipRepository.save(newShip);
    return savedShip;
  }

  async findAll(
    getShipsDto: GetShipsDto,
  ): Promise<{ data: Ship[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
      order = 'DESC',
    } = getShipsDto;
    const [data, total] = await this.shipRepository.findAndCount({
      order: { [orderBy]: order },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async findById(id: string): Promise<Ship> {
    return this.shipRepository.findOne({ where: { id } });
  }
}
