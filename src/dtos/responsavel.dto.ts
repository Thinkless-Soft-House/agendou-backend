import { IsNumber, IsOptional } from 'class-validator';

export class ResponsavelCreateDTO {
  @IsNumber()
  salaId: string;
  @IsNumber()
  usuarioId: string;
}

export class ResponsavelUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  empresaId: number;

  @IsOptional()
  @IsNumber()
  salaId: string;
  usuarioId: string;
}
