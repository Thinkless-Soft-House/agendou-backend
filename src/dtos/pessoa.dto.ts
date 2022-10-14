import { Pessoa } from '@/interfaces/pessoa.interface';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class PessoaCreateDTO {
  @IsString()
  nome: string;
}

export class PessoaUpdateDTO {
  @IsNumber()
  id: number;

  nome?: string;
}
