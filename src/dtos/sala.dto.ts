import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class SalaCreateDTO {
  @IsNumber()
  status: number;
  @IsString()
  nome: string;
  @IsBoolean()
  multiplasMarcacoes: boolean;

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
  @IsBoolean()
  multiplasMarcacoes: boolean;

  @IsOptional()
  @IsNumber()
  empresaId: number;
}
