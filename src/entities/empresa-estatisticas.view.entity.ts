import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { EmpresaEntity } from './empresa.entity';
import { UsuarioEntity } from './usuario.entity';
import { SalaEntity } from './sala.entity';
import { ReservaEntity } from './reserva.entity';

@ViewEntity({
  name: 'V_EMPRESA_ESTATISTICAS_VIEW',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('e.EMP_ID', 'EMPEST_ID')
      .addSelect('e.EMP_NOME', 'EMPEST_NOME')
      .addSelect('e.EMP_LOGOURL', 'EMPEST_LOGO')
      .addSelect('e.EMP_TELEFONE', 'EMPEST_TELEFONE')
      .addSelect('e.EMP_CPFCNPJ', 'EMPEST_CPFCNPJ')
      .addSelect('e.EMP_MUNICIPIO', 'EMPEST_MUNICIPIO')
      .addSelect('e.EMP_ESTADO', 'EMPEST_ESTADO')
      .addSelect('e.EMP_PAIS', 'EMPEST_PAIS')
      .addSelect('CAST(COUNT(DISTINCT u.USU_ID) AS INT)', 'EMPEST_TOTALUSUARIOS')
      .addSelect('CAST(COUNT(DISTINCT r.RES_ID) AS INT)', 'EMPEST_TOTALRESERVAS')
      .from(EmpresaEntity, 'e')
      .leftJoin(UsuarioEntity, 'u', 'u.USU_EMP_ID = e.EMP_ID')
      .leftJoin(SalaEntity, 's', 's.SAL_EMP_ID = e.EMP_ID')
      .leftJoin(ReservaEntity, 'r', 'r.RES_SAL_ID = s.SAL_ID')
      .groupBy('e.EMP_ID'),
})
export class EmpresaEstatisticasView {
  @ViewColumn({ name: 'EMPEST_ID' })
  id: number;

  @ViewColumn({name: 'EMPEST_NOME'})
  nome: string;

  @ViewColumn({name: 'EMPEST_LOGO'})
  logo: string;

  @ViewColumn({name: 'EMPEST_TELEFONE'})
  telefone: string;

  @ViewColumn({name: 'EMPEST_CPFCNPJ'})
  cpfCnpj: number;

  @ViewColumn({name: 'EMPEST_MUNICIPIO'})
  municipio: string;

  @ViewColumn({name: 'EMPEST_ESTADO'})
  estado: string;

  @ViewColumn({name: 'EMPEST_PAIS'})
  pais: string;

  @ViewColumn({name: 'EMPEST_TOTALUSUARIOS'})
  totalUsuarios: number;

  @ViewColumn({name: 'EMPEST_TOTALRESERVAS'})
  totalReservas: number;
}
