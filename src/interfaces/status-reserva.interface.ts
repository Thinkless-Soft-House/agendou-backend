import { ReservaEntity } from '@/entities/reserva.entity';
import { StatusEntity } from '@/entities/status.entity';

export interface StatusReserva {
  id: number;

  reservaId: number;
  statusId: number;

  reserva: ReservaEntity;
  status: StatusEntity;
}
