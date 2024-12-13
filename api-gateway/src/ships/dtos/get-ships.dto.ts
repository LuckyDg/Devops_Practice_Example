import { IsOptional } from "class-validator";

export class GetShipsDto {
    @IsOptional()
    page?: number;
  
    @IsOptional()
    limit?: number;
  
    @IsOptional()
    orderBy?: string;
  
    @IsOptional()
    order?: 'ASC' | 'DESC';
  }
  