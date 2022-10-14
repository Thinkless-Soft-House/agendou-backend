import { UsuarioEntity } from '@/entities/usuario.entity';

export interface Empresa {
  id: number;
  logoUrl: string;

  userCreated: number;
  dateCreated: Date;

  userUpdated: number;
  dateUpdated: Date;

  usuarios: UsuarioEntity[];
}
