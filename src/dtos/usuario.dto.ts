import { IsEmail, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PessoaCreateDTO } from './pessoa.dto';

export class UsuarioCreateDTO {
  @IsEmail()
  login: string;

  @IsString()
  senha: string;

  @IsNumber()
  status: number;

  @IsNumber()
  userCreated: number;

  @IsNumber()
  permissaoId: number;

  @IsOptional()
  @IsNumber()
  empresaId: number;

  @IsObject()
  pessoa: PessoaCreateDTO;
}

export class UsuarioUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsEmail()
  login?: string;

  @IsOptional()
  @IsString()
  senha?: string;

  @IsOptional()
  @IsNumber()
  status?: number;

  @IsOptional()
  @IsNumber()
  userUpdated: number;

  @IsOptional()
  @IsNumber()
  permissaoId: number;
}

export class UsuarioLoginDTO {
  @IsEmail()
  login?: string;

  @IsString()
  senha?: string;
}
