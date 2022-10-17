import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReservaCreateDTO {
  @IsString()
  date: string;
  @IsString()
  horaInicio: string;
  @IsString()
  horaFim: string;
  @IsString()
  observacao: string;

  @IsNumber()
  salaId: number;
  @IsNumber()
  usuarioId: number;
}

export class ReservaUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  horaInicio: string;

  @IsOptional()
  @IsString()
  horaFim: string;

  @IsOptional()
  @IsString()
  observacao: string;
}
