import { Sala } from '@/interfaces/sala.interface';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DisponibilidadeEntity } from './disponibilidade.entity';
import { EmpresaEntity } from './empresa.entity';
import { ReservaEntity } from './reserva.entity';
import { ResponsavelEntity } from './responsavel.entity';

@Entity({ name: 'SALA' })
export class SalaEntity extends BaseEntity implements Sala {
  @PrimaryGeneratedColumn({ name: 'SAL_ID' })
  id: number;
  @Column({ name: 'SAL_STATUS' })
  status: number;
  @Column({ name: 'SAL_NOME' })
  nome: string;
  @Column({ name: 'SAL_MULTIPLASMARCACOES' })
  multiplasMarcacoes: boolean;

  @Column({ name: 'SAL_FOTO', nullable: true, type: 'text' })
  foto: string;

  @Column({ name: 'SAL_EMP_ID' })
  empresaId: number;

  @ManyToOne(() => EmpresaEntity, empresa => empresa.salas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'SAL_EMP_ID', referencedColumnName: 'id' }])
  empresa: EmpresaEntity;

  @OneToMany(() => ResponsavelEntity, responsavel => responsavel.sala, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  responsavel: ResponsavelEntity[];

  @OneToMany(() => ReservaEntity, reserva => reserva.sala, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  reservas: ReservaEntity[];
  @OneToMany(() => DisponibilidadeEntity, disponibilidade => disponibilidade.sala, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  disponibilidades: DisponibilidadeEntity[];
}
