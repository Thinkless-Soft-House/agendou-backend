import { EntityRepository, Like, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { EmpresaEntity } from '@/entities/empresa.entity';
import { Empresa } from '@/interfaces/empresa.interface';
import { EmpresaCreateDTO, EmpresaUpdateDTO } from '@/dtos/empresa.dto';
import { PaginationConfig } from '@/interfaces/utils.interface';
import { isNull } from 'util';

@EntityRepository()
class EmpresaService extends Repository<EmpresaEntity> {
  public async findAllCompany(): Promise<Empresa[]> {
    const companies: Empresa[] = await EmpresaEntity.find();
    return companies;
  }

  public async findCompanyById(companyId: number): Promise<Empresa> {
    if (isEmpty(companyId)) throw new HttpException(400, 'CompanyId está vazio');

    const findCompany: Empresa = await EmpresaEntity.findOne({ where: { id: companyId } });
    if (!findCompany) throw new HttpException(409, 'Empresa não existe');

    return findCompany;
  }

  public async findCompanyByCategory(categoryId: number, paginationConfig: PaginationConfig) {
    if (isEmpty(categoryId)) throw new HttpException(400, 'CompanyId está vazio');
    const order = {};
    order[paginationConfig.orderColumn] = paginationConfig.order;
    const [results, total]: [Empresa[], number] = await EmpresaEntity.findAndCount({ where: { categoriaId: categoryId } });

    return {
      data: results,
      total,
    };
  }

  public async findCompanyByFilter(paginationConfig: PaginationConfig, haveRooms: boolean, nameEmpresa: string, categoryId: number) {
    // if (isEmpty(categoryId)) throw new HttpException(400, 'CompanyId está vazio');
    console.log('here', paginationConfig);
    let where = '';
    if (nameEmpresa !== null) where += `where e.EMP_NOME LIKE '%${nameEmpresa}%'`;
    if (categoryId !== null) where += where === '' ? `where e.EMP_CATEMP_ID = ${categoryId}` : ` AND e.EMP_CATEMP_ID = ${categoryId}`;

    const query = `select ${this.mapRawToEntity()}, count(s.SAL_ID) as QUANTIDADE_SALAS
    ${categoryId !== null ? ', ce.CATEMP_DESCRICAO as categoriaNome' : ''}
    from dev.EMPRESA as e
    ${categoryId !== null ? 'inner join dev.CATEGORIA_EMPRESA as ce ON e.EMP_CATEMP_ID = ce.CATEMP_ID' : ''}
    ${haveRooms ? 'inner' : 'left'} join dev.SALA as s ON e.EMP_ID = s.SAL_EMP_ID
      ${where}
      group by e.EMP_NOME
      order by ${this.getOneRawNameOfEntityName(paginationConfig.orderColumn)} ${paginationConfig.order}
    limit ${paginationConfig.take} offset ${paginationConfig.skip}`;
    console.log('query', query);
    const results = await EmpresaEntity.query(query);

    const total = await EmpresaEntity.query(`select COUNT(distinct EMP_ID) AS total FROM dev.EMPRESA AS e
    ${haveRooms ? 'inner' : 'left'} join dev.SALA as s ON e.EMP_ID = s.SAL_EMP_ID
      ${where}
      `);

    return {
      data: results,
      total: +total[0].total,
    };
  }

  public async createCompany(companyData: EmpresaCreateDTO): Promise<Empresa> {
    if (isEmpty(companyData)) throw new HttpException(400, 'companyData is empty');

    const createCompanyData: Empresa = await EmpresaEntity.create({ ...companyData }).save();

    return createCompanyData;
  }

  public async updateCompany(companyId: number, companyData: EmpresaUpdateDTO): Promise<Empresa> {
    if (isEmpty(companyData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findCompany: Empresa = await EmpresaEntity.findOne({ where: { id: companyId } });
    if (!findCompany) throw new HttpException(409, 'Empresa não existe');

    await EmpresaEntity.update(companyId, { ...companyData });

    const updateCompany: Empresa = await EmpresaEntity.findOne({ where: { id: companyId } });
    return updateCompany;
  }

  public async deleteCompany(companyId: number): Promise<Empresa> {
    if (isEmpty(companyId)) throw new HttpException(400, 'CompanyId está vazio');

    const findCompany: Empresa = await EmpresaEntity.findOne({ where: { id: companyId } });
    if (!findCompany) throw new HttpException(409, 'Empresa não existe');

    await EmpresaEntity.delete({ id: companyId });
    return findCompany;
  }

  private mapRawToEntity() {
    return `
    e.EMP_ID as id,
    e.EMP_LOGOURL as logo,
    e.EMP_NOME as nome,
    e.EMP_TELEFONE as telefone,
    e.EMP_CPFCNPJ as cpfCnpj,
    e.EMP_MUNICIPIO as municipio,
    e.EMP_ESTADO as estado,
    e.EMP_PAIS as pais,
    e.EMP_ENDERECO as endereco,
    e.EMP_NUMEROENDERECO as numeroEndereco,
    e.EMP_CEP as cep,
    e.EMP_CATEMP_ID as categoriaId,
    e.EMP_USERINCLUI as userCreated,
    e.EMP_DTAINCLUI as dateCreated,
    e.EMP_USERALTERA as userUpdated,
    e.EMP_DTAALTERA as dateUpdated
    `;
  }
  private getOneRawNameOfEntityName(entity: string) {
    return entity === 'id'
      ? `e.EMP_ID`
      : entity === 'logo'
      ? `e.EMP_LOGOURL`
      : entity === 'nome'
      ? `e.EMP_NOME`
      : entity === 'telefone'
      ? `e.EMP_TELEFONE`
      : entity === 'cpfCnpj'
      ? `e.EMP_CPFCNPJ`
      : entity === 'municipio'
      ? `e.EMP_MUNICIPIO`
      : entity === 'estado'
      ? `e.EMP_ESTADO`
      : entity === 'pais'
      ? `e.EMP_PAIS`
      : entity === 'endereco'
      ? `e.EMP_ENDERECO`
      : entity === 'numeroEndereco'
      ? `e.EMP_NUMEROENDERECO`
      : entity === 'cep'
      ? `e.EMP_CEP`
      : entity === 'categoriaId'
      ? `e.EMP_CATEMP_ID`
      : entity === 'userCreated'
      ? `e.EMP_USERINCLUI`
      : entity === 'dateCreated'
      ? `e.EMP_DTAINCLUI`
      : entity === 'userUpdated'
      ? `e.EMP_USERALTERA`
      : entity === 'dateUpdated'
      ? `e.EMP_DTAALTERA`
      : '';
  }
}

export default EmpresaService;
