import { Empresa } from '@/interfaces/empresa.interface';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CategoriaEmpresaEntity } from './categoria-empresa.entity';
import { SalaEntity } from './sala.entity';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'EMPRESA' })
export class EmpresaEntity extends BaseEntity implements Empresa {
  @PrimaryGeneratedColumn({ name: 'EMP_ID' })
  id: number;
  @Column({ name: 'EMP_LOGOURL', nullable: true, type: 'text' })
  logo: string;
  @Column({ name: 'EMP_NOME', nullable: true })
  nome: string;
  @Column({ name: 'EMP_TELEFONE', nullable: true })
  telefone: string;
  @Column({ name: 'EMP_CPFCNPJ', nullable: true, type: 'bigint' })
  cpfCnpj: number;
  @Column({ name: 'EMP_MUNICIPIO', nullable: true })
  municipio: string;
  @Column({ name: 'EMP_ESTADO', nullable: true })
  estado: string;
  @Column({ name: 'EMP_PAIS', nullable: true })
  pais: string;
  @Column({ name: 'EMP_ENDERECO', nullable: true })
  endereco: string;
  @Column({ name: 'EMP_NUMEROENDERECO', nullable: true })
  numeroEndereco: string;
  @Column({ name: 'EMP_CEP', nullable: true })
  cep: number;

  @Column({ name: 'EMP_CATEMP_ID' })
  categoriaId: number;

  @Column({ name: 'EMP_USERINCLUI' })
  userCreated: number;

  @Column({ type: 'int', default: 1 })
  EMP_PROVIDER: number;

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

  @ManyToOne(() => CategoriaEmpresaEntity, categoriaEmpresa => categoriaEmpresa.empresas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'EMP_CATEMP_ID', referencedColumnName: 'id' }])
  categoria: CategoriaEmpresaEntity;
}
