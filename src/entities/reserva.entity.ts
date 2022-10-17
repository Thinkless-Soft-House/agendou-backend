import { SalaEntity } from '@/entities/sala.entity';
import { UsuarioEntity } from '@/entities/usuario.entity';
import { Reserva } from '@/interfaces/reserva.interface';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusReservaEntity } from './status-reserva.entity';

@Entity({ name: 'RESERVA' })
export class ReservaEntity extends BaseEntity implements Reserva {
  @PrimaryGeneratedColumn({ name: 'RES_ID' })
  id: number;

  @Column({ name: 'RES_DATA' })
  date: string;
  @Column({ name: 'RES_HRINICIO' })
  horaInicio: string;
  @Column({ name: 'RES_HRFIM' })
  horaFim: string;
  @Column({ name: 'RES_OBSERVACAO' })
  observacao: string;

  @Column({ name: 'RES_SAL_ID' })
  salaId: number;
  @Column({ name: 'RES_USU_ID' })
  usuarioId: number;

  @ManyToOne(() => SalaEntity, sala => sala.reservas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'RES_SAL_ID', referencedColumnName: 'id' }])
  sala: SalaEntity;

  @ManyToOne(() => UsuarioEntity, usuario => usuario.reservas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'RES_USU_ID', referencedColumnName: 'id' }])
  usuario: UsuarioEntity;

  @OneToMany(() => StatusReservaEntity, statusReserva => statusReserva.reserva, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  statusReserva: StatusReservaEntity[];
}
