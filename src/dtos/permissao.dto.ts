import { PermissaoEnum } from '@/interfaces/permissao.interface';
import { IsNumber, IsString } from 'class-validator';

export class PermissaoCreateDTO {
  @IsString()
  descricao: string;
}

export class PermissaoUpdateDTO {
  @IsNumber()
  id: PermissaoEnum;
  @IsString()
  descricao: string;
}
