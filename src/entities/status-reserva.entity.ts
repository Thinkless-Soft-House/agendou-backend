import { StatusReserva } from '@/interfaces/status-reserva.interface';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @CreateDateColumn({ name: 'STARES_STA_DATE' })
  date: number;

  @ManyToOne(() => ReservaEntity, reserva => reserva.statusReserva, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'STARES_RES_ID', referencedColumnName: 'id' }])
  reserva: ReservaEntity;

  @ManyToOne(() => StatusEntity, status => status.statusReserva, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'STARES_STA_ID', referencedColumnName: 'id' }])
  status: StatusEntity;
}
