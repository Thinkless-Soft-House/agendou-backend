import { Responsavel } from '@/interfaces/responsavel.interface';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SalaEntity } from './sala.entity';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'RESPONSAVEL' })
export class ResponsavelEntity extends BaseEntity implements Responsavel {
  @PrimaryGeneratedColumn({ name: 'RESP_ID' })
  id: number;
  @Column({ name: 'RESP_SAL_ID' })
  salaId: number;
  @Column({ name: 'RESP_USU_ID' })
  usuarioId: number;

  @ManyToOne(() => SalaEntity, sala => sala.responsavel, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'RESP_SAL_ID', referencedColumnName: 'id' }])
  sala: SalaEntity;

  @ManyToOne(() => UsuarioEntity, usuario => usuario.responsavel, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'RESP_USU_ID', referencedColumnName: 'id' }])
  usuario: UsuarioEntity;
}
