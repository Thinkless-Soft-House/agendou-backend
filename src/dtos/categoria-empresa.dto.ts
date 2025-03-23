import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoriaEmpresaCreateDTO {
  @IsString()
  descricao: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || 'Sala')
  prefixParticao: string;
}
export class CategoriaEmpresaUpdateDTO {
  @IsNumber()
  id: number;
  @IsString()
  descricao: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || 'Sala')
  prefixParticao: string;
}
