import { Permissao, PermissaoEnum } from '@/interfaces/permissao.interface';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'PERMISSAO' })
export class PermissaoEntity extends BaseEntity implements Permissao {
  @PrimaryGeneratedColumn({ name: 'PER_ID' })
  id: PermissaoEnum;
  @Column({ name: 'PER_DESCRI' })
  descricao: string;

  @OneToMany(() => UsuarioEntity, usuario => usuario.permissao, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  usuarios: UsuarioEntity[];
}
