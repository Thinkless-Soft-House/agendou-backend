import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { DisponibilidadeEntity } from '@/entities/disponibilidade.entity';
import { Disponibilidade } from '@/interfaces/disponibilidade.interface';
import { DisponibilidadeCreateDTO, DisponibilidadeUpdateDTO } from '@/dtos/disponibilidade.dto';

@EntityRepository()
class DisponibilidadeService extends Repository<DisponibilidadeEntity> {
  public async findAllAvailability(): Promise<Disponibilidade[]> {
    const disponibilidades: Disponibilidade[] = await DisponibilidadeEntity.find();
    return disponibilidades;
  }

  public async findAvailabilityById(availabilityId: number): Promise<Disponibilidade> {
    if (isEmpty(availabilityId)) throw new HttpException(400, 'O ID da disponibilidade está vazio');

    const findAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
    if (!findAvailability) throw new HttpException(409, 'Disponibilidade não encontrada');

    return findAvailability;
  }

  public async findAvailabilityByDay(day: number): Promise<Disponibilidade> {
    if (isEmpty(day)) throw new HttpException(400, 'O dia está vazio');
    console.log('Meu dia', day);
    const findAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { diaSemanaIndex: day } });
    if (!findAvailability) throw new HttpException(409, 'Disponibilidade não disponível para esse dia');
    console.log('findAvailability', findAvailability);

    return findAvailability;
  }

  public async findAvailabilityByRoom(room: number): Promise<Disponibilidade[]> {
    if (isEmpty(room)) throw new HttpException(400, 'A sala está vazia');
    console.log('Minha sala', room);
    const findAvailability: Disponibilidade[] = await DisponibilidadeEntity.find({ where: { salaId: room } });
    if (!findAvailability) throw new HttpException(409, 'Disponibilidade não disponível para essa sala');
    console.log('findAvailability', findAvailability);

    return findAvailability;
  }

  public async createAvailability(availabilityData: DisponibilidadeCreateDTO): Promise<Disponibilidade> {
    if (isEmpty(availabilityData)) throw new HttpException(400, 'Os dados da disponibilidade estão vazios');

    const createAvailabilityData: Disponibilidade = await DisponibilidadeEntity.create({ ...availabilityData }).save();

    return createAvailabilityData;
  }

  public async createManyAvailability(availabilityData: DisponibilidadeCreateDTO[]): Promise<Disponibilidade[]> {
    if (isEmpty(availabilityData)) throw new HttpException(400, 'Os dados da disponibilidade estão vazios');

    const savePoints = availabilityData.map(async data => await DisponibilidadeEntity.create({ ...data }).save());
    const results = await Promise.all(savePoints);

    return results;
  }

  public async updateAvailability(availabilityId: number, availabilityData: DisponibilidadeUpdateDTO): Promise<Disponibilidade> {
    if (isEmpty(availabilityData)) throw new HttpException(400, 'Os dados da disponibilidade estão vazios');

    const findAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
    if (!findAvailability) throw new HttpException(409, 'Disponibilidade não encontrada');

    await DisponibilidadeEntity.update(availabilityId, { ...availabilityData });

    const updateAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
    return updateAvailability;
  }

  public async updateManyAvailability(availabilityDatas: DisponibilidadeUpdateDTO[]): Promise<Disponibilidade[]> {
    if (isEmpty(availabilityDatas)) throw new HttpException(400, 'Os dados da disponibilidade estão vazios');

    const list = [];
    for (const availabilityData of availabilityDatas) {
      const availabilityId = availabilityData.id;
      const findAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
      if (!findAvailability) throw new HttpException(409, 'Disponibilidade não encontrada');

      await DisponibilidadeEntity.update(availabilityId, { ...availabilityData });

      const updateAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
      list.push(updateAvailability);
    }

    return list;
  }

  public async deleteAvailability(availabilityId: number): Promise<Disponibilidade> {
    if (isEmpty(availabilityId)) throw new HttpException(400, 'O ID da disponibilidade está vazio');

    const findAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
    if (!findAvailability) throw new HttpException(409, 'Disponibilidade não encontrada');

    await DisponibilidadeEntity.delete({ id: availabilityId });
    return findAvailability;
  }
}

export default DisponibilidadeService;
