import { Between, EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty, checkHour } from '@utils/util';
import { ReservaEntity } from '@/entities/reserva.entity';
import { Reserva } from '@/interfaces/reserva.interface';
import { ReservaCreateDTO, ReservaUpdateDTO } from '@/dtos/reserva.dto';
import DisponibilidadeService from './disponibilidade.service';
import { PaginationConfig } from '@/interfaces/utils.interface';

import { set } from 'date-fns';

@EntityRepository()
class ReservaService extends Repository<ReservaEntity> {
  disponibilidadeService: DisponibilidadeService = new DisponibilidadeService();

  public async findAllBooking(paginationConfig: PaginationConfig): Promise<Reserva[]> {
    const order = {};
    order[paginationConfig.orderColumn] = paginationConfig.order;

    const bookings: Reserva[] = await ReservaEntity.find({
      order,
      take: paginationConfig.take,
      skip: paginationConfig.skip,
    });
    return bookings;
  }

  public async findBookingById(bookingId: number): Promise<Reserva> {
    if (isEmpty(bookingId)) throw new HttpException(400, 'BookingId está vazio');

    const findBooking: Reserva = await ReservaEntity.findOne({ where: { id: bookingId } });
    if (!findBooking) throw new HttpException(409, 'Usuario não existe');

    return findBooking;
  }

  public async findBookingByRommAndDate(rommId: number, month: number, year: number): Promise<Reserva[]> {
    if (isEmpty(rommId)) throw new HttpException(400, 'CompanyId está vazio');

    console.log('month', month);
    console.log('year', year);

    const startDate = set(new Date(), {
      year,
      month: month - 1,
      date: 1,
      hours: 0,
      minutes: 0,
      milliseconds: 1,
    });

    const endDate = set(new Date(), {
      year,
      month: month,
      date: 1,
      hours: 0,
      minutes: 0,
      milliseconds: 1,
    });

    console.log('romm', rommId);
    console.log('startDate', startDate);
    console.log('endDate', endDate);

    const results: Reserva[] = await ReservaEntity.find({
      where: { salaId: rommId, date: Between(startDate, endDate) },
    });

    return results;
  }

  public async createBooking(bookingData: ReservaCreateDTO): Promise<Reserva> {
    if (isEmpty(bookingData)) throw new HttpException(400, 'bookingData is empty');

    // Check Disponibilidade dia
    const availabilityDay = await this.disponibilidadeService.findAvailabilityByDay(bookingData.diaSemanaIndex);

    // Se existe, checar horario
    const hourValidate = checkHour(
      { start: availabilityDay.hrAbertura, end: availabilityDay.hrFim },
      { start: bookingData.horaInicio, end: bookingData.horaFim },
    );
    // Se fora do horario, erro 404
    if (!hourValidate) throw new HttpException(409, 'Horario da reserva não compatível com a do dia escolhido');

    // Testar se horario está vazio
    const findBooking: Reserva = await ReservaEntity.findOne({
      where: { diaSemanaIndex: bookingData.diaSemanaIndex, horaInicio: bookingData.horaInicio, horaFim: bookingData.horaFim },
    });
    // Se não, erro 500 com mensagem
    if (findBooking) throw new HttpException(400, 'Duplicidade de reservas');

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
