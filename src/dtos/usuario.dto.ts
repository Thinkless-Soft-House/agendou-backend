import { IsEmail, IsNumber, IsObject, IsString } from 'class-validator';
import { PessoaCreateDTO } from './pessoa.dto';

export class UsuarioCreateDTO {
  @IsEmail()
  login: string;

  @IsString()
  senha: string;

  @IsString()
  status: string;

  @IsNumber()
  userCreated: number;

  @IsNumber()
  permissaoId: number;
  @IsNumber()
  empresaId: number;

  @IsObject()
  pessoa: PessoaCreateDTO;
}

export class UsuarioUpdateDTO {
  @IsNumber()
  id: number;

  @IsEmail()
  login?: string;

  @IsString()
  senha?: string;

  @IsString()
  status?: string;

  @IsNumber()
  userUpdated: number;
}
