import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { StatusReservaEntity } from '@/entities/status-reserva.entity';
import { StatusReserva } from '@/interfaces/status-reserva.interface';
import { StatusReservaCreateDTO, StatusReservaUpdateDTO } from '@/dtos/status-reserva.dto';

@EntityRepository()
class StatusReservaService extends Repository<StatusReservaEntity> {
  public async findAllBookingStatus(): Promise<StatusReserva[]> {
    const bookingStatus: StatusReserva[] = await StatusReservaEntity.find();
    return bookingStatus;
  }

  public async findBookingStatusById(bookingStatusId: number): Promise<StatusReserva> {
    if (isEmpty(bookingStatusId)) throw new HttpException(400, 'O ID do status da reserva está vazio');

    const findBookingStatus: StatusReserva = await StatusReservaEntity.findOne({ where: { id: bookingStatusId } });
    if (!findBookingStatus) throw new HttpException(409, 'Status da reserva não encontrado');

    return findBookingStatus;
  }

  public async findBookingStatusByBooking(bookingId: number): Promise<StatusReserva[]> {
    if (isEmpty(bookingId)) throw new HttpException(400, 'O ID da reserva está vazio');

    const findBookingStatus: StatusReserva[] = await StatusReservaEntity.find({ where: { reservaId: bookingId } });
    if (!findBookingStatus) throw new HttpException(409, 'Status da reserva não encontrado');

    return findBookingStatus;
  }

  public async createBookingStatus(bookingStatusData: StatusReservaCreateDTO): Promise<StatusReserva> {
    if (isEmpty(bookingStatusData)) throw new HttpException(400, 'Os dados do status da reserva estão vazios');

    const createBookingStatusData: StatusReserva = await StatusReservaEntity.create({ ...bookingStatusData }).save();

    return createBookingStatusData;
  }

  public async updateBookingStatus(bookingStatusId: number, bookingStatusData: StatusReservaUpdateDTO): Promise<StatusReserva> {
    if (isEmpty(bookingStatusData)) throw new HttpException(400, 'Os dados do status da reserva estão vazios');

    const findBookingStatus: StatusReserva = await StatusReservaEntity.findOne({ where: { id: bookingStatusId } });
    if (!findBookingStatus) throw new HttpException(409, 'Status da reserva não encontrado');

    await StatusReservaEntity.update(bookingStatusId, { ...bookingStatusData });

    const updateBookingStatus: StatusReserva = await StatusReservaEntity.findOne({ where: { id: bookingStatusId } });
    return updateBookingStatus;
  }

  public async deleteBookingStatus(bookingStatusId: number): Promise<StatusReserva> {
    if (isEmpty(bookingStatusId)) throw new HttpException(400, 'O ID do status da reserva está vazio');

    const findBookingStatus: StatusReserva = await StatusReservaEntity.findOne({ where: { id: bookingStatusId } });
    if (!findBookingStatus) throw new HttpException(409, 'Status da reserva não encontrado');

    await StatusReservaEntity.delete({ id: bookingStatusId });
    return findBookingStatus;
  }
}

export default StatusReservaService;
