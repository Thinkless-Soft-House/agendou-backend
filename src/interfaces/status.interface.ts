import { StatusReserva } from './status-reserva.interface';

export interface Status {
  id: StatusEnum;
  tipo: string;

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
