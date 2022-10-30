import { EntityRepository, Like, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { SalaEntity } from '@/entities/sala.entity';
import { Sala } from '@/interfaces/sala.interface';
import { SalaCreateDTO, SalaUpdateDTO } from '@/dtos/sala.dto';
import { PaginationConfig } from '@/interfaces/utils.interface';

@EntityRepository()
class SalaService extends Repository<SalaEntity> {
  public async findAllRomm(): Promise<Sala[]> {
    const romms: Sala[] = await SalaEntity.find({ relations: ['empresa'] });
    return romms;
  }

  public async findRommById(rommId: number): Promise<Sala> {
    if (isEmpty(rommId)) throw new HttpException(400, 'RommId está vazio');

    const findRomm: Sala = await SalaEntity.findOne({ where: { id: rommId }, relations: ['empresa'] });
    if (!findRomm) throw new HttpException(409, 'Sala não existe');

    return findRomm;
  }

  public async findRommByCompany(
    companyId: number,
    paginationConfig: PaginationConfig,
  ): Promise<{
    data: Sala[];
    total: number;
  }> {
    if (isEmpty(companyId)) throw new HttpException(400, 'RommId está vazio');
    const order = {};
    order[paginationConfig.orderColumn] = paginationConfig.order;

    const [results, total]: [Sala[], number] = await SalaEntity.findAndCount({
      where: { empresaId: companyId },
      order,
      take: paginationConfig.take,
      skip: paginationConfig.skip,
    });

    return {
      data: results,
      total,
    };
  }

  public async findRommByFilter(
    paginationConfig: PaginationConfig,
    salaName: string,
    empresaId: number,
  ): Promise<{
    data: Sala[];
    total: number;
  }> {
    const order = {};
    order[paginationConfig.orderColumn] = paginationConfig.order;
    const where = {};
    if (salaName !== null) where['nome'] = Like('%' + salaName + '%');
    if (empresaId !== null) where['empresaId'] = empresaId;

    const [results, total]: [Sala[], number] = await SalaEntity.findAndCount({
      where,
      order,
      take: paginationConfig.take,
      skip: paginationConfig.skip,
    });

    return {
      data: results,
      total,
    };
  }

  public async createRomm(rommData: SalaCreateDTO): Promise<Sala> {
    if (isEmpty(rommData)) throw new HttpException(400, 'rommData is empty');

    const createRommData: Sala = await SalaEntity.create({ ...rommData }).save();

    return createRommData;
  }

  public async updateRomm(rommId: number, rommData: SalaUpdateDTO): Promise<Sala> {
    if (isEmpty(rommData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findRomm: Sala = await SalaEntity.findOne({ where: { id: rommId } });
    if (!findRomm) throw new HttpException(409, 'Sala não existe');

    await SalaEntity.update(rommId, { ...rommData });

    const updateRomm: Sala = await SalaEntity.findOne({ where: { id: rommId } });
    return updateRomm;
  }

  public async deleteRomm(rommId: number): Promise<Sala> {
    if (isEmpty(rommId)) throw new HttpException(400, 'RommId está vazio');

    const findRomm: Sala = await SalaEntity.findOne({ where: { id: rommId } });
    if (!findRomm) throw new HttpException(409, 'Sala não existe');

    await SalaEntity.delete({ id: rommId });
    return findRomm;
  }
}

export default SalaService;
