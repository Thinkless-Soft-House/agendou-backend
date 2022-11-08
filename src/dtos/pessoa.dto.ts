import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PessoaCreateDTO {
  @IsString()
  nome: string;

  @IsNumber()
  cpfCnpj: number;
  @IsOptional()
  @IsString()
  municipio: string;
  @IsString()
  estado: string;
  @IsString()
  pais: string;
  @IsString()
  endereco: string;
  @IsNumber()
  numero: number;
  @IsNumber()
  cep: number;
  @IsNumber()
  telefone: number;
  @IsString()
  dataNascimento: string;

  @IsOptional()
  @IsString()
  foto: string;
}

export class PessoaUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsNumber()
  cpfCnpj: number;
  @IsOptional()
  @IsString()
  municipio: string;
  @IsOptional()
  @IsString()
  estado: string;
  @IsOptional()
  @IsString()
  pais: string;
  @IsOptional()
  @IsString()
  endereco: string;
  @IsOptional()
  @IsNumber()
  numero: number;
  @IsOptional()
  @IsNumber()
  telefone: number;
  @IsOptional()
  @IsNumber()
  cep: number;
  @IsOptional()
  @IsString()
  dataNascimento: string;

  @IsOptional()
  @IsString()
  foto: string;
}
