import { UsuarioEntity } from '@/entities/usuario.entity';

export interface Permissao {
  id: PermissaoEnum;
  descricao: string;

  usuarios: UsuarioEntity[];
}

export enum PermissaoEnum {
  _,
  Cliente,
  Administrador,
  Empresario,
  Funcionario,
}
