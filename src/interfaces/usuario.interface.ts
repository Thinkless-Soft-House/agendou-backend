import { EmpresaEntity } from '@/entities/empresa.entity';
import { PermissaoEntity } from '@/entities/permissao.entity';
import { PessoaEntity } from '@/entities/pessoa.entity';
import { ReservaEntity } from '@/entities/reserva.entity';
import { ResponsavelEntity } from '@/entities/responsavel.entity';

export interface Usuario {
  id: number;
  login: string;
  senha: string;
  status: number; // TODO: Errado isso aqui

  resetPasswordCode: number;
  pushToken: string;

  userCreated: number;
  dateCreated: Date;

  userUpdated: number;
  dateUpdated: Date;

  empresaId: number;
  permissaoId: number;
  pessoaId: number;

  empresa: EmpresaEntity;
  permissao: PermissaoEntity;
  pessoa: PessoaEntity;

  responsavel: ResponsavelEntity[];
  reservas: ReservaEntity[];
}
