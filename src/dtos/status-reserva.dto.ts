import { IsNumber, IsOptional } from 'class-validator';

export class StatusReservaCreateDTO {
  @IsNumber()
  reservaId: number;
  @IsNumber()
  statusId: number;
}

export class StatusReservaUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  reservaId: number;
  @IsOptional()
  @IsNumber()
  statusId: number;
}
