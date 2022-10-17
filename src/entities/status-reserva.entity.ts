import { StatusReserva } from '@/interfaces/status-reserva.interface';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReservaEntity } from './reserva.entity';
import { StatusEntity } from './status.entity';

@Entity({ name: 'STATUS_RESERVA' })
export class StatusReservaEntity extends BaseEntity implements StatusReserva {
  @PrimaryGeneratedColumn({ name: 'STARES_ID' })
  id: number;

  @Column({ name: 'STARES_RES_ID' })
  reservaId: number;
  @Column({ name: 'STARES_STA_ID' })
  statusId: number;

  @ManyToOne(() => ReservaEntity, reserva => reserva.statusReserva, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'STARES_RES_ID', referencedColumnName: 'id' }])
  reserva: ReservaEntity;

  @ManyToOne(() => StatusEntity, status => status.statusReserva, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'STARES_STA_ID', referencedColumnName: 'id' }])
  status: StatusEntity;
}
