import { UsuarioEntity } from '@/entities/usuario.entity';

export interface Permissao {
  id: number;
  descricao: string;

  usuarios: UsuarioEntity[];
}
