import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class DisponibilidadeCreateDTO {
  @IsString()
  hrAbertura: string;
  @IsString()
  hrFim: string;
  @IsString()
  diaSemana: string;
  @IsNumber()
  minDiasCan: number;

  @IsNumber()
  diaSemanaIndex: number;
  @IsNumber()
  intervaloMinutos: number;

  @IsNumber()
  salaId: number;
  @IsBoolean()
  ativo: boolean;
}
export class DisponibilidadeUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsBoolean()
  ativo: boolean;
  @IsOptional()
  @IsString()
  hrAbertura: string;
  @IsOptional()
  @IsString()
  hrFim: string;
  @IsOptional()
  @IsString()
  diaSemana: string;
  @IsOptional()
  @IsNumber()
  minDiaScan: number;

  @IsOptional()
  @IsNumber()
  diaSemanaIndex: number;
  @IsOptional()
  @IsNumber()
  intervaloMinutos: number;
}
