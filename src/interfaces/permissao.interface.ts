import { Usuario } from './usuario.interface';

export interface Permissao {
  id: PermissaoEnum;
  descricao: string;

  usuarios: Usuario[];
}

export enum PermissaoEnum {
  Admin = 1,
  Cliente = 2,
  Funcionario = 3,
  Empresa = 4,
}
