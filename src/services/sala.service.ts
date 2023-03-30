import { ReservaEntity } from '@/entities/reserva.entity';
import { ResponsavelEntity } from '@/entities/responsavel.entity';
import { DisponibilidadeEntity } from '@/entities/disponibilidade.entity';
import { EntityRepository, getManager, Like, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { SalaEntity } from '@/entities/sala.entity';
import { Sala } from '@/interfaces/sala.interface';
import { SalaCreateDTO, SalaUpdateDTO } from '@/dtos/sala.dto';
import { PaginationConfig } from '@/interfaces/utils.interface';
import EmpresaService from './empresa.service';

@EntityRepository()
class SalaService extends Repository<SalaEntity> {
  empresaService = new EmpresaService();

  public async findAllRoom(): Promise<Sala[]> {
    const rooms: Sala[] = await SalaEntity.find({ relations: ['empresa'] });
    return rooms;
  }

  public async findRoomById(roomId: number): Promise<Sala> {
    if (isEmpty(roomId)) throw new HttpException(400, 'RoomId está vazio');

    const findRoom: Sala = await SalaEntity.findOne({ where: { id: roomId }, relations: ['empresa'] });
    if (!findRoom) throw new HttpException(409, 'Sala não existe');

    return findRoom;
  }

  public async findRoomByCompany(
    companyId: number,
    paginationConfig: PaginationConfig,
  ): Promise<{
    data: Sala[];
    total: number;
  }> {
    if (isEmpty(companyId)) throw new HttpException(400, 'RoomId está vazio');
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

  public async findRoomByFilter(
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
      relations: ['empresa'],
      order,
      take: paginationConfig.take,
      skip: paginationConfig.skip,
    });

    return {
      data: results,
      total,
    };
  }

  public async createRoom(roomData: SalaCreateDTO): Promise<Sala> {
    if (isEmpty(roomData)) throw new HttpException(400, 'roomData is empty');

    const createRoomData: Sala = await SalaEntity.create({ ...roomData }).save();

    return createRoomData;
  }

  public async updateRoom(roomId: number, roomData: SalaUpdateDTO): Promise<Sala> {
    if (isEmpty(roomData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findRoom: Sala = await SalaEntity.findOne({ where: { id: roomId } });
    if (!findRoom) throw new HttpException(409, 'Sala não existe');

    await SalaEntity.update(roomId, { ...roomData });

    const updateRoom: Sala = await SalaEntity.findOne({ where: { id: roomId } });
    return updateRoom;
  }

  public async deleteRoom(roomId: number): Promise<Sala> {
    if (isEmpty(roomId)) throw new HttpException(400, 'RoomId está vazio');

    const findRoom: Sala = await SalaEntity.findOne({ where: { id: roomId } });
    if (!findRoom) throw new HttpException(409, 'Sala não existe');

    // Iniciar a transação
    const manager = getManager();
    manager.transaction(async transactionManager => {
      // Deletar Disponibilidade
      await transactionManager.delete(DisponibilidadeEntity, { salaId: roomId });
      // Deletar Responsável
      await transactionManager.delete(ResponsavelEntity, { salaId: roomId });
      // Deletar Reserva
      await transactionManager.delete(ReservaEntity, { salaId: roomId });

      // Deletar Sala'
      await transactionManager.delete(SalaEntity, roomId);
    });

    return findRoom;
  }
}

export default SalaService;
