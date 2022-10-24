import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EmpresaCreateDTO {
  @IsString()
  logo: string;

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
  logo: string;

  @IsNumber()
  userUpdated: number;

  @IsOptional()
  @IsNumber()
  categoriaId: number;
}
