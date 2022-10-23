import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EmpresaCreateDTO {
  @IsString()
  logoUrl: string;

  @IsNumber()
  userCreated: number;

  @IsNumber()
  categoriaId: number;
}

export class EmpresaUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  logoUrl: string;

  @IsNumber()
  userUpdated: number;

  @IsOptional()
  @IsNumber()
  categoriaId: number;
}
