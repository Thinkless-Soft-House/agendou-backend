import { IsNumber, IsOptional } from 'class-validator';

export class ResponsavelCreateDTO {
  @IsNumber()
  salaId: number;
  @IsNumber()
  usuarioId: number;
}

export class ResponsavelUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  empresaId: number;

  @IsOptional()
  @IsNumber()
  salaId: number;
  @IsOptional()
  @IsNumber()
  usuarioId: number;
}
