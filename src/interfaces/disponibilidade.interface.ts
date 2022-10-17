import { SalaEntity } from '@/entities/sala.entity';

export interface Disponibilidade {
  id: number;
  ativo: boolean;

  hrAbertura: string;
  hrFim: string;
  diaSemana: string;
  minDiasCan: number;

  salaId: number;

  sala: SalaEntity;
}
