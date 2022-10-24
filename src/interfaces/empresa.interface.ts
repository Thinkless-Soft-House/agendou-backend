import { CategoriaEmpresaEntity } from '@/entities/categoria-empresa.entity';
import { SalaEntity } from '@/entities/sala.entity';
import { UsuarioEntity } from '@/entities/usuario.entity';

export interface Empresa {
  id: number;
  logo: string;

  categoriaId: number;

  userCreated: number;
  dateCreated: Date;

  userUpdated: number;
  dateUpdated: Date;

  categoria: CategoriaEmpresaEntity;

  usuarios: UsuarioEntity[];
  salas: SalaEntity[];
}
