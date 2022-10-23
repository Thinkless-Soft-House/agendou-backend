import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { DisponibilidadeEntity } from '@/entities/disponibilidade.entity';
import { Disponibilidade } from '@/interfaces/disponibilidade.interface';
import { DisponibilidadeCreateDTO, DisponibilidadeUpdateDTO } from '@/dtos/disponibilidade.dto';

@EntityRepository()
class DisponibilidadeService extends Repository<DisponibilidadeEntity> {
  public async findAllAvailability(): Promise<Disponibilidade[]> {
    const Availabilities: Disponibilidade[] = await DisponibilidadeEntity.find();
    return Availabilities;
  }

  public async findAvailabilityById(availabilityId: number): Promise<Disponibilidade> {
    if (isEmpty(availabilityId)) throw new HttpException(400, 'AvailabilityId está vazio');

    const findAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
    if (!findAvailability) throw new HttpException(409, 'Disponibilidade não existe');

    return findAvailability;
  }

  public async findAvailabilityByDay(day: number): Promise<Disponibilidade> {
    if (isEmpty(day)) throw new HttpException(400, 'AvailabilityId está vazio');
    console.log('my day', day);
    const findAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { diaSemanaIndex: day } });
    if (!findAvailability) throw new HttpException(409, 'Disponibilidade não disponivel para esse dia');
    console.log('findAvailability', findAvailability);

    return findAvailability;
  }

  public async createAvailability(availabilityData: DisponibilidadeCreateDTO): Promise<Disponibilidade> {
    if (isEmpty(availabilityData)) throw new HttpException(400, 'availabilityData is empty');

    const createAvailabilityData: Disponibilidade = await DisponibilidadeEntity.create({ ...availabilityData }).save();

    return createAvailabilityData;
  }

  public async createManyAvailability(availabilityData: DisponibilidadeCreateDTO[]): Promise<Disponibilidade[]> {
    if (isEmpty(availabilityData)) throw new HttpException(400, 'availabilityData is empty');

    const savePoints = availabilityData.map(async data => await DisponibilidadeEntity.create({ ...data }).save());
    const results = await Promise.all(savePoints);

    return results;
  }

  public async updateAvailability(availabilityId: number, availabilityData: DisponibilidadeUpdateDTO): Promise<Disponibilidade> {
    if (isEmpty(availabilityData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
    if (!findAvailability) throw new HttpException(409, 'Disponibilidade não existe');

    await DisponibilidadeEntity.update(availabilityId, { ...availabilityData });

    const updateAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
    return updateAvailability;
  }

  public async deleteAvailability(availabilityId: number): Promise<Disponibilidade> {
    if (isEmpty(availabilityId)) throw new HttpException(400, 'AvailabilityId está vazio');

    const findAvailability: Disponibilidade = await DisponibilidadeEntity.findOne({ where: { id: availabilityId } });
    if (!findAvailability) throw new HttpException(409, 'Disponibilidade não existe');

    await DisponibilidadeEntity.delete({ id: availabilityId });
    return findAvailability;
  }
}

export default DisponibilidadeService;
