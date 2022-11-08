import { Pessoa } from '@/interfaces/pessoa.interface';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'PESSOA' })
export class PessoaEntity extends BaseEntity implements Pessoa {
  @PrimaryGeneratedColumn({ name: 'PES_ID' })
  id: number;

  @Column({ name: 'PES_NAME' })
  nome: string;

  @Column({ name: 'PES_CPFCNPJ', nullable: true, type: 'bigint', unique: true })
  cpfCnpj: number;
  @Column({ name: 'PES_FUNCAO', nullable: true })
  funcao: string;
  @Column({ name: 'PES_MUNICIPIO', nullable: true })
  municipio: string;
  @Column({ name: 'PES_ESTADO', nullable: true })
  estado: string;
  @Column({ name: 'PES_PAIS', nullable: true })
  pais: string;
  @Column({ name: 'PES_ENDERECO', nullable: true })
  endereco: string;
  @Column({ name: 'PES_NUMERO', nullable: true })
  numero: number;
  @Column({ name: 'PES_TELEFONE', nullable: true, type: 'bigint' })
  telefone: number;
  @Column({ name: 'PES_CEP', nullable: true })
  cep: number;
  @Column({ name: 'PES_DATANASCIMENTO', nullable: true })
  dataNascimento: string;

  @Column({ name: 'PES_FOTO', nullable: true, type: 'text' })
  foto: string;

  @Column({ name: 'PES_USUINCLUI', nullable: true })
  userCreated: number;
  @CreateDateColumn({ name: 'PES_DTAINCLUI' })
  dateCreated: Date;

  @Column({ name: 'PES_USUALTERA', nullable: true })
  userUpdated: number;
  @UpdateDateColumn({ name: 'PES_DTAALTERA' })
  dateUpdated: Date;
}
