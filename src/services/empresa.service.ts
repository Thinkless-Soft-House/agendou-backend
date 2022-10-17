import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { EmpresaEntity } from '@/entities/empresa.entity';
import { Empresa } from '@/interfaces/empresa.interface';
import { EmpresaCreateDTO, EmpresaUpdateDTO } from '@/dtos/empresa.dto';

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
}

export default EmpresaService;
