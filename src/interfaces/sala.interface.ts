import { DisponibilidadeEntity } from '@/entities/disponibilidade.entity';
import { EmpresaEntity } from '@/entities/empresa.entity';
import { ReservaEntity } from '@/entities/reserva.entity';
import { ResponsavelEntity } from '@/entities/responsavel.entity';

export interface Sala {
  id: number;
  status: string;
  nome: string;

  empresaId: number;
  empresa: EmpresaEntity;

  responsavel: ResponsavelEntity[];
  reservas: ReservaEntity[];
  disponibilidades: DisponibilidadeEntity[];
}
