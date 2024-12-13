import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateShipDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  type: string;

  @IsString()
  @IsOptional()
  route?: string;
}

