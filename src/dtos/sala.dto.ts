import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SalaCreateDTO {
  @IsString()
  status: string;

  @IsString()
  nome: string;

  @IsNumber()
  empresaId: number;
}

export class SalaUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsNumber()
  empresaId: number;
}
