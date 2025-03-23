import { StatusReserva } from './status-reserva.interface';

export interface Status {
  id: number;
  tipo: StatusEnum;

  statusReserva: StatusReserva[];
}

export enum StatusEnum {
  _,
  Aguardando,
  Confirmado,
  Cancelado,
  Finalizado,
  Reprovado,
}
