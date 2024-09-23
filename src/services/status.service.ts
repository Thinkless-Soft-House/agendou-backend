import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { StatusEntity } from '@/entities/status.entity';
import { Status } from '@/interfaces/status.interface';
import { StatusCreateDTO, StatusUpdateDTO } from '@/dtos/status.dto';

@EntityRepository()
class StatusService extends Repository<StatusEntity> {
  public async findAllStatus(): Promise<Status[]> {
    const status: Status[] = await StatusEntity.find();
    return status;
  }

  public async findStatusById(statusId: number): Promise<Status> {
    if (isEmpty(statusId)) throw new HttpException(400, 'O ID do status está vazio');

    const findStatus: Status = await StatusEntity.findOne({ where: { id: statusId } });
    if (!findStatus) throw new HttpException(409, 'Status não encontrado');

    return findStatus;
  }

  public async createStatus(statusData: StatusCreateDTO): Promise<Status> {
    if (isEmpty(statusData)) throw new HttpException(400, 'Os dados do status estão vazios');

    const createStatusData: Status = await StatusEntity.create({ ...statusData }).save();

    return createStatusData;
  }

  public async updateStatus(statusId: number, statusData: StatusUpdateDTO): Promise<Status> {
    if (isEmpty(statusData)) throw new HttpException(400, 'Os dados do status estão vazios');

    const findStatus: Status = await StatusEntity.findOne({ where: { id: statusId } });
    if (!findStatus) throw new HttpException(409, 'Status não encontrado');

    await StatusEntity.update(statusId, { ...statusData });

    const updateStatus: Status = await StatusEntity.findOne({ where: { id: statusId } });
    return updateStatus;
  }

  public async deleteStatus(statusId: number): Promise<Status> {
    if (isEmpty(statusId)) throw new HttpException(400, 'O ID do status está vazio');

    const findStatus: Status = await StatusEntity.findOne({ where: { id: statusId } });
    if (!findStatus) throw new HttpException(409, 'Status não encontrado');

    await StatusEntity.delete({ id: statusId });
    return findStatus;
  }
}

export default StatusService;
