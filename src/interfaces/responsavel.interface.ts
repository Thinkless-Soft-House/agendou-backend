import { SalaEntity } from '@/entities/sala.entity';
import { UsuarioEntity } from '@/entities/usuario.entity';

export interface Responsavel {
  id: number;
  salaId: string;
  usuarioId: string;

  sala: SalaEntity;
  usuario: UsuarioEntity;
}
