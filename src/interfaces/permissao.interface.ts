import { UsuarioEntity } from '@/entities/usuario.entity';

export interface Permissao {
  id: PermissaoEnum;
  descricao: string;

  usuarios: UsuarioEntity[];
}

export enum PermissaoEnum {
  Cliente = 1,
  Administrador = 2,
  Empresario = 3,
  Funcionario = 4,
}
