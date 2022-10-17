import { Status } from '@/interfaces/status.interface';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusReservaEntity } from './status-reserva.entity';

@Entity({ name: 'STATUS' })
export class StatusEntity extends BaseEntity implements Status {
  @PrimaryGeneratedColumn({ name: 'STA_ID' })
  id: number;

  @Column({ name: 'STA_TIPO' })
  tipo: string;

  @OneToMany(() => StatusReservaEntity, statusReserva => statusReserva.status, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  statusReserva: StatusReservaEntity[];
}
