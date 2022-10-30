import { Between, EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty, checkHour } from '@utils/util';
import { ReservaEntity } from '@/entities/reserva.entity';
import { Reserva } from '@/interfaces/reserva.interface';
import { ReservaCreateDTO, ReservaUpdateDTO } from '@/dtos/reserva.dto';
import DisponibilidadeService from './disponibilidade.service';
import { PaginationConfig } from '@/interfaces/utils.interface';

import { set, format } from 'date-fns';
import StatusReservaService from './status-reserva.service';
import { StatusReserva } from '@/interfaces/status-reserva.interface';
import { StatusEnum } from '@/interfaces/status.interface';

@EntityRepository()
class ReservaService extends Repository<ReservaEntity> {
  disponibilidadeService: DisponibilidadeService = new DisponibilidadeService();
  statusReservaService: StatusReservaService = new StatusReservaService();

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

  public async findBookingByFilter(
    paginationConfig: PaginationConfig,
    usuarioId: number,
    empresaId: number,
    active: string[],
    salaId: number,
    dia: number,
    hInicio: string,
    hFim: string,
    date: string,
  ): Promise<{ data: Reserva[]; total: number }> {
    // if (isEmpty(categoryId)) throw new HttpException(400, 'CompanyId está vazio');
    console.log('here', paginationConfig);
    console.log('active', active);
    let where = '';

    if (active !== null && active.length > 0)
      where +=
        where === ''
          ? `where SR.STARES_STA_ID IN (${active.join(', ')}) AND
            (
              select MAX(SR2.STARES_STA_DATE) from STATUS_RESERVA as SR2
              where
                SR2.STARES_RES_ID = R.RES_ID
            ) = SR.STARES_STA_DATE`
          : ` AND SR.STARES_STA_ID IN (${active.join(', ')}) AND
          (
            select MAX(SR2.STARES_STA_DATE) from STATUS_RESERVA as SR2
            where
              SR2.STARES_RES_ID = R.RES_ID
          ) = SR.STARES_STA_DATE`;
    if (empresaId !== null) where += where === '' ? `where S.SAL_EMP_ID = ${empresaId}` : ` AND S.SAL_EMP_ID = ${empresaId}`;
    if (usuarioId !== null) where += where === '' ? `where R.RES_USU_ID = ${usuarioId}` : ` AND R.RES_USU_ID = ${usuarioId}`;
    if (salaId !== null) where += where === '' ? `where R.RES_SAL_ID = ${salaId}` : ` AND R.RES_SAL_ID = ${salaId}`;
    if (dia !== null) where += where === '' ? `where R.RES_DIASEMANAINDEX = ${dia}` : ` AND R.RES_DIASEMANAINDEX = ${dia}`;
    if (hInicio !== null) where += where === '' ? `where R.RES_HRINICIO = '${hInicio}'` : ` AND R.RES_HRINICIO = '${hInicio}'`;
    if (hFim !== null) where += where === '' ? `where R.RES_HRFIM = '${hFim}'` : ` AND R.RES_HRFIM = '${hFim}'`;
    if (date !== null) {
      const formatDate = format(new Date(date), 'dd/MM/y');
      where +=
        where === ''
          ? `where (
      select DATE_FORMAT(MAX(SR3.STARES_STA_DATE), '%d/%m/%Y') from STATUS_RESERVA as SR3
      where
        SR3.STARES_RES_ID = R.RES_ID
    ) = '${formatDate}'`
          : ` AND (
            select DATE_FORMAT(MAX(SR3.STARES_STA_DATE), '%d/%m/%Y') from STATUS_RESERVA as SR3
            where
              SR3.STARES_RES_ID = R.RES_ID
          ) = '${formatDate}'`;
    }

    const query = `
    SELECT
      ${this.mapRawToEntity()},
      SR.STARES_STA_ID as statusId,
      S.SAL_EMP_ID as empresaId,
      (
        select S2.STA_TIPO from STATUS as S2
          where
            S2.STA_ID = SR.STARES_STA_ID
      ) as status
      FROM RESERVA AS R
      INNER JOIN STATUS_RESERVA AS SR on SR.STARES_RES_ID = R.RES_ID
      INNER JOIN SALA AS S on S.SAL_ID = R.RES_SAL_ID
      ${where}
      order by ${this.getOneRawNameOfEntityName(paginationConfig.orderColumn)} ${paginationConfig.order}
    limit ${paginationConfig.take} offset ${paginationConfig.skip}`;

    console.log('query =>', query);
    const results = await ReservaEntity.query(query);

    const total = await ReservaEntity.query(`SELECT
    count(R.RES_ID) as total
    FROM RESERVA AS R
    INNER JOIN STATUS_RESERVA AS SR on SR.STARES_RES_ID = R.RES_ID
    INNER JOIN SALA AS S on S.SAL_ID = R.RES_SAL_ID
    ${where}
      `);

    // ${this.getOneRawNameOfEntityName(paginationConfig.orderColumn)}

    return {
      data: results,
      total: +total[0].total,
      // total: 0,
    };
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

    const paginationConfig: PaginationConfig = {
      take: 1,
      skip: 0,
      orderColumn: 'id',
      order: 'ASC',
    };

    // Testar se horario está vazio
    const { data } = await this.findBookingByFilter(
      paginationConfig,
      null,
      null,
      ['1', '2'],
      bookingData.salaId,
      bookingData.diaSemanaIndex,
      bookingData.horaInicio,
      bookingData.horaFim,
      bookingData.date,
    );
    const findBooking: Reserva = data[0];

    // Se não, erro 500 com mensagem
    if (findBooking) throw new HttpException(400, 'Duplicidade de reservas');

    const createBookingData: Reserva = await ReservaEntity.create({ ...bookingData }).save();
    // Criar novo status = Aguardando
    await this.statusReservaService.createBookingStatus({
      reservaId: createBookingData.id,
      statusId: StatusEnum.Aguardando,
    });

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

  private mapRawToEntity() {
    return `
    R.RES_ID as id,
    R.RES_DATA as date,
    R.RES_HRINICIO as horaInicio,
    R.RES_HRFIM as horaFim,
    R.RES_OBSERVACAO as observacao,
    R.RES_DIASEMANAINDEX as diaSemanaIndex,
    R.RES_SAL_ID as salaId,
    R.RES_USU_ID as usuarioId
    `;
  }

  private getOneRawNameOfEntityName(entity: string) {
    return entity === 'id'
      ? 'R.RES_ID'
      : entity === 'date'
      ? 'R.RES_DATA'
      : entity === 'horaInicio'
      ? 'R.RES_HRINICIO'
      : entity === 'horaFim'
      ? 'R.RES_HRFIM'
      : entity === 'observacao'
      ? 'R.RES_OBSERVACAO'
      : entity === 'diaSemanaIndex'
      ? 'R.RES_DIASEMANAINDEX'
      : entity === 'salaId'
      ? 'R.RES_SAL_ID'
      : entity === 'usuarioId'
      ? 'R.RES_USU_ID'
      : '';
  }
}

export default ReservaService;
