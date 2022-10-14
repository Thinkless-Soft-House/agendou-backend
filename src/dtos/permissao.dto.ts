import { IsNumber, IsString } from 'class-validator';

export class PermissaoCreateDTO {
  @IsString()
  descricao: string;
}

export class PermissaoUpdateDTO {
  @IsNumber()
  id: number;
  @IsString()
  descricao: string;
}
