import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class SalaCreateDTO {
  @IsNumber()
  status: number;
  @IsString()
  nome: string;
  @IsBoolean()
  multiplasMarcacoes: boolean;
  @IsString()
  foto: string;

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
  @IsString()
  foto: string;

  @IsOptional()
  @IsNumber()
  empresaId: number;
}
