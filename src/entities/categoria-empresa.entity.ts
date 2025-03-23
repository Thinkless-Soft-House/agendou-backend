import { CategoriaEmpresa } from '@/interfaces/categoria-empresa.interface';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmpresaEntity } from './empresa.entity';

@Entity({ name: 'CATEGORIA_EMPRESA' })
export class CategoriaEmpresaEntity extends BaseEntity implements CategoriaEmpresa {
  @PrimaryGeneratedColumn({ name: 'CATEMP_ID' })
  id: number;

  @Column({ name: 'CATEMP_DESCRICAO' })
  descricao: string;

  @Column({ name: 'CATEMP_PREFIXPARTICAO', default: 'Sala' })
  prefixParticao: string;

  @OneToMany(() => EmpresaEntity, empresa => empresa.categoria, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  empresas: EmpresaEntity[];
}
