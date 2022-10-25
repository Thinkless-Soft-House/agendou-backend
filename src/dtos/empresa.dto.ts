import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EmpresaCreateDTO {
  @IsString()
  logo: string;

  @IsNumber()
  userCreated: number;

  @IsNumber()
  categoriaId: number;

  @IsString()
  nome: string;
  @IsString()
  telefone: string;
  @IsNumber()
  cpfCnpj: number;
  @IsString()
  municipio: string;
  @IsString()
  estado: string;
  @IsString()
  pais: string;
  @IsString()
  endereco: string;
  @IsString()
  numeroEndereco: string;
  @IsNumber()
  cep: number;
}

export class EmpresaUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsNumber()
  userUpdated: number;

  @IsOptional()
  @IsNumber()
  categoriaId: number;

  @IsOptional()
  @IsString()
  nome: string;
  @IsOptional()
  @IsString()
  telefone: string;
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
  @IsString()
  numeroEndereco: string;
  @IsOptional()
  @IsNumber()
  cep: number;
}
