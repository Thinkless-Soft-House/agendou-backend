import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { ResponsavelEntity } from '@/entities/responsavel.entity';
import { Responsavel } from '@/interfaces/responsavel.interface';
import { ResponsavelCreateDTO, ResponsavelUpdateDTO } from '@/dtos/responsavel.dto';

@EntityRepository()
class ResponsavelService extends Repository<ResponsavelEntity> {
  public async findAllResponsible(): Promise<Responsavel[]> {
    const responsibles: Responsavel[] = await ResponsavelEntity.find();
    return responsibles;
  }

  public async findAllResponsibleByRommWithUsers(roomId: number): Promise<Responsavel[]> {
    const responsibles: Responsavel[] = await ResponsavelEntity.find({ where: { salaId: roomId }, relations: ['usuario'] });
    return responsibles;
  }

  public async findResponsibleById(responsibleId: number): Promise<Responsavel> {
    if (isEmpty(responsibleId)) throw new HttpException(400, 'ResponsibleId está vazio');

    const findResponsible: Responsavel = await ResponsavelEntity.findOne({ where: { id: responsibleId } });
    if (!findResponsible) throw new HttpException(409, 'Usuario não existe');

    return findResponsible;
  }

  public async createResponsible(responsibleData: ResponsavelCreateDTO): Promise<Responsavel> {
    if (isEmpty(responsibleData)) throw new HttpException(400, 'responsibleData is empty');

    const createResponsibleData: Responsavel = await ResponsavelEntity.create({ ...responsibleData }).save();

    return createResponsibleData;
  }
  public async createManyResponsible(responsibleData: ResponsavelCreateDTO[]): Promise<Responsavel[]> {
    if (isEmpty(responsibleData)) throw new HttpException(400, 'responsibleData is empty');

    const promises = responsibleData.map(async data => await ResponsavelEntity.create({ ...data }).save());
    return Promise.all(promises);
  }

  public async updateResponsible(responsibleId: number, responsibleData: ResponsavelUpdateDTO): Promise<Responsavel> {
    if (isEmpty(responsibleData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findResponsible: Responsavel = await ResponsavelEntity.findOne({ where: { id: responsibleId } });
    if (!findResponsible) throw new HttpException(409, 'Responsável não existe');

    await ResponsavelEntity.update(responsibleId, { ...responsibleData });

    const updateResponsible: Responsavel = await ResponsavelEntity.findOne({ where: { id: responsibleId } });
    return updateResponsible;
  }

  public async updateManyResponsible(responsibleDatas: ResponsavelUpdateDTO[]): Promise<Responsavel[]> {
    if (isEmpty(responsibleDatas)) throw new HttpException(400, 'Usuário Data está vazio');

    const list = [];
    for (const responsibleData of responsibleDatas) {
      const responsibleId = responsibleData.id;
      const findResponsible: Responsavel = await ResponsavelEntity.findOne({ where: { id: responsibleId } });
      if (!findResponsible) throw new HttpException(409, 'Responsável não existe');

      await ResponsavelEntity.update(responsibleId, { ...responsibleData });

      const updateResponsible: Responsavel = await ResponsavelEntity.findOne({ where: { id: responsibleId } });
      list.push(updateResponsible);
    }

    return list;
  }

  public async deleteResponsible(responsibleId: number): Promise<Responsavel> {
    if (isEmpty(responsibleId)) throw new HttpException(400, 'ResponsibleId está vazio');

    const findResponsible: Responsavel = await ResponsavelEntity.findOne({ where: { id: responsibleId } });
    if (!findResponsible) throw new HttpException(409, 'Responsável não existe');

    await ResponsavelEntity.delete({ id: responsibleId });
    return findResponsible;
  }
}

export default ResponsavelService;
