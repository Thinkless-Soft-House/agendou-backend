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
  date: Date;
  @Column({ name: 'RES_HRINICIO' })
  horaInicio: string;
  @Column({ name: 'RES_HRFIM' })
  horaFim: string;
  @Column({ name: 'RES_OBSERVACAO' })
  observacao: string;
  @Column({ name: 'RES_DIASEMANAINDEX' })
  diaSemanaIndex: number;

  @Column({ name: 'RES_SAL_ID' })
  salaId: number;
  @Column({ name: 'RES_USU_ID' })
  usuarioId: number;

  @ManyToOne(
    () => {
      const { SalaEntity } = require('./sala.entity');
      return SalaEntity;
    },
    (sala: any) => sala.reservas,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn([{ name: 'RES_SAL_ID', referencedColumnName: 'id' }])
  sala: any; // Use 'any' para evitar problemas de tipo

  @ManyToOne(
    () => {
      const { UsuarioEntity } = require('./usuario.entity');
      return UsuarioEntity;
    },
    (usuario: any) => usuario.reservas,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      eager: true,
    },
  )
  @JoinColumn([{ name: 'RES_USU_ID', referencedColumnName: 'id' }])
  usuario: any;

  @OneToMany(() => StatusReservaEntity, statusReserva => statusReserva.reserva, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  statusReserva: StatusReservaEntity[];
}
