import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SalaCreateDTO {
  @IsNumber()
  status: number;

  @IsString()
  nome: string;

  @IsNumber()
  empresaId: number;
}

export class SalaUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  status: number;

  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsNumber()
  empresaId: number;
}
