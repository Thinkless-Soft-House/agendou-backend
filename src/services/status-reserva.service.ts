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
    if (isEmpty(bookingStatusId)) throw new HttpException(400, 'BookingStatusId está vazio');

    const findBookingStatus: StatusReserva = await StatusReservaEntity.findOne({ where: { id: bookingStatusId } });
    if (!findBookingStatus) throw new HttpException(409, 'Usuario não existe');

    return findBookingStatus;
  }

  public async createBookingStatus(bookingStatusData: StatusReservaCreateDTO): Promise<StatusReserva> {
    if (isEmpty(bookingStatusData)) throw new HttpException(400, 'bookingStatusData is empty');

    const createBookingStatusData: StatusReserva = await StatusReservaEntity.create({ ...bookingStatusData }).save();

    return createBookingStatusData;
  }

  public async updateBookingStatus(bookingStatusId: number, bookingStatusData: StatusReservaUpdateDTO): Promise<StatusReserva> {
    if (isEmpty(bookingStatusData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findBookingStatus: StatusReserva = await StatusReservaEntity.findOne({ where: { id: bookingStatusId } });
    if (!findBookingStatus) throw new HttpException(409, 'Reserva não existe');

    await StatusReservaEntity.update(bookingStatusId, { ...bookingStatusData });

    const updateBookingStatus: StatusReserva = await StatusReservaEntity.findOne({ where: { id: bookingStatusId } });
    return updateBookingStatus;
  }

  public async deleteBookingStatus(bookingStatusId: number): Promise<StatusReserva> {
    if (isEmpty(bookingStatusId)) throw new HttpException(400, 'BookingStatusId está vazio');

    const findBookingStatus: StatusReserva = await StatusReservaEntity.findOne({ where: { id: bookingStatusId } });
    if (!findBookingStatus) throw new HttpException(409, 'Reserva não existe');

    await StatusReservaEntity.delete({ id: bookingStatusId });
    return findBookingStatus;
  }
}

export default StatusReservaService;
