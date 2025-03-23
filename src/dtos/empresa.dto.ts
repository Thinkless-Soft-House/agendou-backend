import { IsBoolean, IsIn, IsNumber, IsObject, IsOptional, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

class DiaDisponibilidadeDTO {
  @IsBoolean()
  ativo: boolean;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/) // Valida formato HH:MM
  inicio: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  fim: string;
}

class DisponibilidadePadraoDTO {
  @Type(() => DiaDisponibilidadeDTO)
  domingo: DiaDisponibilidadeDTO;

  @Type(() => DiaDisponibilidadeDTO)
  segunda: DiaDisponibilidadeDTO;

  @Type(() => DiaDisponibilidadeDTO)
  terca: DiaDisponibilidadeDTO;

  @Type(() => DiaDisponibilidadeDTO)
  quarta: DiaDisponibilidadeDTO;

  @Type(() => DiaDisponibilidadeDTO)
  quinta: DiaDisponibilidadeDTO;

  @Type(() => DiaDisponibilidadeDTO)
  sexta: DiaDisponibilidadeDTO;

  @Type(() => DiaDisponibilidadeDTO)
  sabado: DiaDisponibilidadeDTO;
}

export class EmpresaCreateDTO {
  @IsString()
  @IsOptional()
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
  @IsOptional()
  municipio: string;
  @IsString()
  @IsOptional()
  estado: string;
  @IsString()
  @IsOptional()
  pais: string;
  @IsString()
  endereco: string;
  @IsString()
  @IsOptional()
  numeroEndereco: string;
  @IsNumber()
  @IsOptional()
  cep: number;

  @IsString()
  @IsIn(['active', 'inactive'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsIn(['active', 'inactive'])
  @IsOptional()
  assinaturaStatus?: string;

  @IsNumber()
  @IsOptional()
  plano: number;

  @IsObject()
  @Type(() => DisponibilidadePadraoDTO)
  disponibilidadePadrao: DisponibilidadePadraoDTO;
}

export class EmpresaUpdateDisponibilidadeDTO {
  @IsString()
  @IsIn(['active', 'inactive', 'busy'])
  disponibilidade: string;
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
