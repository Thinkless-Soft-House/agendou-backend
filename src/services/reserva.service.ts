import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { ReservaEntity } from '@/entities/reserva.entity';
import { Reserva } from '@/interfaces/reserva.interface';
import { ReservaCreateDTO, ReservaUpdateDTO } from '@/dtos/reserva.dto';

@EntityRepository()
class ReservaService extends Repository<ReservaEntity> {
  public async findAllBooking(): Promise<Reserva[]> {
    const bookings: Reserva[] = await ReservaEntity.find();
    return bookings;
  }

  public async findBookingById(bookingId: number): Promise<Reserva> {
    if (isEmpty(bookingId)) throw new HttpException(400, 'BookingId está vazio');

    const findBooking: Reserva = await ReservaEntity.findOne({ where: { id: bookingId } });
    if (!findBooking) throw new HttpException(409, 'Usuario não existe');

    return findBooking;
  }

  public async createBooking(bookingData: ReservaCreateDTO): Promise<Reserva> {
    if (isEmpty(bookingData)) throw new HttpException(400, 'bookingData is empty');

    const createBookingData: Reserva = await ReservaEntity.create({ ...bookingData }).save();

    return createBookingData;
  }

  public async updateBooking(bookingId: number, bookingData: ReservaUpdateDTO): Promise<Reserva> {
    if (isEmpty(bookingData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findBooking: Reserva = await ReservaEntity.findOne({ where: { id: bookingId } });
    if (!findBooking) throw new HttpException(409, 'Reserva não existe');

    await ReservaEntity.update(bookingId, { ...bookingData });

    const updateBooking: Reserva = await ReservaEntity.findOne({ where: { id: bookingId } });
    return updateBooking;
  }

  public async deleteBooking(bookingId: number): Promise<Reserva> {
    if (isEmpty(bookingId)) throw new HttpException(400, 'BookingId está vazio');

    const findBooking: Reserva = await ReservaEntity.findOne({ where: { id: bookingId } });
    if (!findBooking) throw new HttpException(409, 'Reserva não existe');

    await ReservaEntity.delete({ id: bookingId });
    return findBooking;
  }
}

export default ReservaService;
