import { Empresa } from '@/interfaces/empresa.interface';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SalaEntity } from './sala.entity';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'EMPRESA' })
export class EmpresaEntity extends BaseEntity implements Empresa {
  @PrimaryGeneratedColumn({ name: 'EMP_ID' })
  id: number;
  @Column({ name: 'EMP_LOGOURL' })
  logoUrl: string;

  @Column({ name: 'EMP_USERINCLUI' })
  userCreated: number;

  @CreateDateColumn({
    name: 'EMP_DTAINCLUI',
  })
  dateCreated: Date;

  @Column({ name: 'EMP_USERALTERA', nullable: true })
  userUpdated: number;
  @UpdateDateColumn({ name: 'EMP_DTAALTERA', nullable: true })
  dateUpdated: Date;

  @OneToMany(() => UsuarioEntity, usuario => usuario.empresa, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  usuarios: UsuarioEntity[];

  @OneToMany(() => SalaEntity, sala => sala.empresa, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  salas: SalaEntity[];
}
