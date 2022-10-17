import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PessoaCreateDTO {
  @IsString()
  nome: string;
}

export class PessoaUpdateDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  nome: string;
}
