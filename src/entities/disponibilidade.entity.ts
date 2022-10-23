import { Disponibilidade } from '@/interfaces/disponibilidade.interface';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SalaEntity } from './sala.entity';

@Entity({ name: 'DISPONIBILIDADE' })
export class DisponibilidadeEntity extends BaseEntity implements Disponibilidade {
  @PrimaryGeneratedColumn({ name: 'DIS_ID' })
  id: number;
  @Column({ name: 'DIS_ATIVO', default: true })
  ativo: boolean;

  @Column({ name: 'DIS_HRABERTURA' })
  hrAbertura: string;
  @Column({ name: 'DIS_HRFIM' })
  hrFim: string;
  @Column({ name: 'DIS_DIASEMAMA' })
  diaSemana: string;
  @Column({ name: 'DIS_MINDIASCAN' })
  minDiasCan: number;

  @Column({ name: 'DIS_DIASEMANAINDEX' })
  diaSemanaIndex: number;
  @Column({ name: 'DIS_INTERVALOMINUTOS' })
  intervaloMinutos: number;

  @Column({ name: 'DIS_SAL_ID' })
  salaId: number;

  @ManyToOne(() => SalaEntity, sala => sala.disponibilidades, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'DIS_SAL_ID', referencedColumnName: 'id' }])
  sala: SalaEntity;
}
