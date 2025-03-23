import { ViewEntity, ViewColumn, Connection, BaseEntity } from 'typeorm';
import { CategoriaEmpresaEntity } from '../categoria-empresa.entity';
import { EmpresaEntity } from '../empresa.entity';

@ViewEntity({
  name: 'V_CATEGORIA_EMPRESA_ESTATISTICAS',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('c.CATEMP_ID', 'CATEMPEST_ID')
      .addSelect('c.CATEMP_DESCRICAO', 'CATEMPEST_DESCRICAO')
      .addSelect('c.CATEMP_PREFIXPARTICAO', 'CATEMPEST_PREFIXPARTICAO')
      .addSelect('CAST(COUNT(e.EMP_ID) AS INT)', 'CATEMPEST_TOTALEMPRESAS')
      .from(CategoriaEmpresaEntity, 'c')
      .leftJoin(EmpresaEntity, 'e', 'c.CATEMP_ID = e.EMP_CATEMP_ID')
      .groupBy('c.CATEMP_ID')
      .addGroupBy('c.CATEMP_DESCRICAO')
      .addGroupBy('c.CATEMP_PREFIXPARTICAO'),
})
export class CategoriaEmpresaEstatisticasView extends BaseEntity {
  @ViewColumn({ name: 'CATEMPEST_ID' })
  id: number;

  @ViewColumn({ name: 'CATEMPEST_DESCRICAO' })
  descricao: string;

  @ViewColumn({ name: 'CATEMPEST_PREFIXPARTICAO' })
  prefixParticao: string;

  @ViewColumn({ name: 'CATEMPEST_TOTALEMPRESAS' })
  totalEmpresas: number;
}
