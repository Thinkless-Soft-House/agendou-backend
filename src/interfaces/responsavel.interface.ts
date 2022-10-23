import { SalaEntity } from '@/entities/sala.entity';
import { UsuarioEntity } from '@/entities/usuario.entity';

export interface Responsavel {
  id: number;
  salaId: number;
  usuarioId: number;

  sala: SalaEntity;
  usuario: UsuarioEntity;
}
