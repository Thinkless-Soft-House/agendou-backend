import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CategoriaEmpresaEntity } from '@/entities/categoria-empresa.entity';
import { CategoriaEmpresa } from '@/interfaces/categoria-empresa.interface';
import { CategoriaEmpresaCreateDTO, CategoriaEmpresaUpdateDTO } from '@/dtos/categoria-empresa.dto';

@EntityRepository()
class CategoriaEmpresaService extends Repository<CategoriaEmpresaEntity> {
  public async findAllCategoriaEmpresa(): Promise<CategoriaEmpresa[]> {
    const categoriaEmpresa: CategoriaEmpresa[] = await CategoriaEmpresaEntity.find();
    return categoriaEmpresa;
  }

  public async findCategoriaEmpresaById(categoriaEmpresaId: number): Promise<CategoriaEmpresa> {
    if (isEmpty(categoriaEmpresaId)) throw new HttpException(400, 'CategoriaEmpresaId está vazio');

    const findCategoriaEmpresa: CategoriaEmpresa = await CategoriaEmpresaEntity.findOne({ where: { id: categoriaEmpresaId } });
    if (!findCategoriaEmpresa) throw new HttpException(409, 'Usuario não existe');

    return findCategoriaEmpresa;
  }

  public async createCategoriaEmpresa(categoriaEmpresaData: CategoriaEmpresaCreateDTO): Promise<CategoriaEmpresa> {
    if (isEmpty(categoriaEmpresaData)) throw new HttpException(400, 'categoriaEmpresaData is empty');

    const createCategoriaEmpresaData: CategoriaEmpresa = await CategoriaEmpresaEntity.create({ ...categoriaEmpresaData }).save();

    return createCategoriaEmpresaData;
  }

  public async updateCategoriaEmpresa(categoriaEmpresaId: number, categoriaEmpresaData: CategoriaEmpresaUpdateDTO): Promise<CategoriaEmpresa> {
    if (isEmpty(categoriaEmpresaData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findCategoriaEmpresa: CategoriaEmpresa = await CategoriaEmpresaEntity.findOne({ where: { id: categoriaEmpresaId } });
    if (!findCategoriaEmpresa) throw new HttpException(409, 'CategoriaEmpresa não existe');

    await CategoriaEmpresaEntity.update(categoriaEmpresaId, { ...categoriaEmpresaData });

    const updateCategoriaEmpresa: CategoriaEmpresa = await CategoriaEmpresaEntity.findOne({ where: { id: categoriaEmpresaId } });
    return updateCategoriaEmpresa;
  }

  public async deleteCategoriaEmpresa(categoriaEmpresaId: number): Promise<CategoriaEmpresa> {
    if (isEmpty(categoriaEmpresaId)) throw new HttpException(400, 'CategoriaEmpresaId está vazio');

    const findCategoriaEmpresa: CategoriaEmpresa = await CategoriaEmpresaEntity.findOne({ where: { id: categoriaEmpresaId } });
    if (!findCategoriaEmpresa) throw new HttpException(409, 'CategoriaEmpresa não existe');

    await CategoriaEmpresaEntity.delete({ id: categoriaEmpresaId });
    return findCategoriaEmpresa;
  }
}

export default CategoriaEmpresaService;
