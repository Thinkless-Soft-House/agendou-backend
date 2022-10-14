import { Pessoa } from '@/interfaces/pessoa.interface';
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'PESSOA' })
export class PessoaEntity extends BaseEntity implements Pessoa {
  @PrimaryGeneratedColumn({ name: 'PES_ID' })
  id: number;

  @Column({ name: 'PES_NAME' })
  nome: string;
}
