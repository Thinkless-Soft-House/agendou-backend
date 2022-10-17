import { StatusReserva } from './status-reserva.interface';

export interface Status {
  id: number;
  tipo: string;

  statusReserva: StatusReserva[];
}
