import { IsNumber, IsString } from 'class-validator';

export class CategoriaEmpresaCreateDTO {
  @IsString()
  descricao: string;
}
export class CategoriaEmpresaUpdateDTO {
  @IsNumber()
  id: number;
  @IsString()
  descricao: string;
}
