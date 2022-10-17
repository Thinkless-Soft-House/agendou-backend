import { SalaEntity } from '@/entities/sala.entity';
import { StatusReservaEntity } from '@/entities/status-reserva.entity';
import { UsuarioEntity } from '@/entities/usuario.entity';

export interface Reserva {
  id: number;
  date: string;
  horaInicio: string;
  horaFim: string;
  observacao: string;

  salaId: number;
  usuarioId: number;

  sala: SalaEntity;
  usuario: UsuarioEntity;
  statusReserva: StatusReservaEntity[];
}
