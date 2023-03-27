import { Usuario } from '@/interfaces/usuario.interface';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmpresaEntity } from './empresa.entity';
import { PermissaoEntity } from './permissao.entity';
import { PessoaEntity } from './pessoa.entity';
import { ReservaEntity } from './reserva.entity';
import { ResponsavelEntity } from './responsavel.entity';

@Entity({ name: 'USUARIO' })
export class UsuarioEntity extends BaseEntity implements Usuario {
  @PrimaryGeneratedColumn({ name: 'USU_ID' })
  id: number;

  @Column({ name: 'USU_LOGIN', unique: true })
  login: string;
  @Column({ name: 'USU_SENHA' })
  senha: string;
  @Column({ name: 'USU_STATUS' })
  status: number;

  @Column({ name: 'USU_RESETCODE', nullable: true })
  resetPasswordCode: number;
  @Column({ name: 'USU_PUSHTOKEN', nullable: true })
  pushToken: string;

  @Column({ name: 'USU_USERINCLUI', nullable: true })
  userCreated: number;
  @CreateDateColumn({ name: 'USU_DTAINCLUI' })
  dateCreated: Date;

  @Column({ name: 'USU_USERALTERA', nullable: true })
  userUpdated: number;
  @UpdateDateColumn({ name: 'USU_DTAALTERA' })
  dateUpdated: Date;

  @Column({ name: 'USU_PER_ID' })
  permissaoId: number;
  @Column({ name: 'USU_EMP_ID', nullable: true })
  empresaId: number;
  @Column({ name: 'USU_PES_ID' })
  pessoaId: number;

  @ManyToOne(() => EmpresaEntity, empresa => empresa.usuarios, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
    nullable: true,
  })
  @JoinColumn([{ name: 'USU_EMP_ID', referencedColumnName: 'id' }])
  empresa: EmpresaEntity;

  @ManyToOne(() => PermissaoEntity, permissao => permissao.usuarios, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'USU_PER_ID', referencedColumnName: 'id' }])
  permissao: PermissaoEntity;

  @OneToOne(() => PessoaEntity, pessoa => pessoa.pessoa, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'USU_PES_ID', referencedColumnName: 'id' })
  pessoa: PessoaEntity;

  @OneToMany(() => ResponsavelEntity, responsavel => responsavel.usuario, {
    cascade: true,
  })
  responsavel: ResponsavelEntity[];
  @OneToMany(() => ReservaEntity, reserva => reserva.usuario, {
    cascade: true,
  })
  reservas: ReservaEntity[];
}
