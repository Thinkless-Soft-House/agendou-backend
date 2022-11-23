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
import ResponsavelService from './responsavel.service';
import { sendBookingClientEmail, sendBookingCompanyEmail } from '@/utils/sendEmail';

@EntityRepository()
class ReservaService extends Repository<ReservaEntity> {
  disponibilidadeService: DisponibilidadeService = new DisponibilidadeService();
  statusReservaService: StatusReservaService = new StatusReservaService();
  responsavelService: ResponsavelService = new ResponsavelService();

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
    const query = `
    SELECT
      ${this.mapRawToEntity()},
      SR.STARES_STA_ID as statusId,
      S.SAL_EMP_ID as empresaId,
      (
        select S2.STA_ID as statusId from STATUS as S2
          where
            (
                select SR2.STARES_STA_ID from STATUS_RESERVA as SR2
                  where
                    (
                      select MAX(SR3.STARES_STA_DATE) from STATUS_RESERVA as SR3
                    ) = SR2.STARES_STA_DATE and SR2.STARES_RES_ID = R.RES_ID
            ) = S2.STA_ID
        ) as statusId,
      ${this.mapRawToUserEntity()},
      ${this.mapRawToPersonEntity()},
      ${this.mapRawToCompanyEntity()},
      S.SAL_NOME as salaNome
      FROM RESERVA AS R
      INNER JOIN SALA AS S on S.SAL_ID = R.RES_SAL_ID
      INNER JOIN USUARIO AS U on U.USU_ID = R.RES_USU_ID
      INNER JOIN PESSOA AS P on U.USU_PES_ID = P.PES_ID
      INNER JOIN EMPRESA AS E on S.SAL_EMP_ID = E.EMP_ID
      INNER JOIN STATUS_RESERVA AS SR on SR.STARES_RES_ID = R.RES_ID
        where R.RES_ID = ${bookingId}
    limit 1`;

    console.log('query =>', query);
    const rawData: any[] = await ReservaEntity.query(query);
    const result: Reserva[] = this.mapRawDataToNestedObject(rawData);
    const booking = result[0];

    if (!booking) throw new HttpException(409, 'Usuario não existe');

    return booking;
  }

  public async findBookingByRoomAndDate(roomId: number, month: number, year: number): Promise<Reserva[]> {
    if (isEmpty(roomId)) throw new HttpException(400, 'CompanyId está vazio');

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

    console.log('room', roomId);
    console.log('startDate', startDate);
    console.log('endDate', endDate);

    const results: Reserva[] = await ReservaEntity.find({
      where: { salaId: roomId, date: Between(startDate, endDate) },
    });

    return results;
  }

  public async findBookingByFilter(
    paginationConfig: PaginationConfig,
    usuarioId: number,
    empresaId: number,
    status: string[],
    salaId: number,
    dia: number,
    hInicio: string,
    hFim: string,
    date: string,
    texto: string,
  ): Promise<{ data: Reserva[]; total: number }> {
    // if (isEmpty(categoryId)) throw new HttpException(400, 'CompanyId está vazio');
    console.log('here', paginationConfig);
    console.log('active', status);
    let where = `where (
      select MAX(SR2.STARES_STA_DATE) from STATUS_RESERVA as SR2
      where
        SR2.STARES_RES_ID = R.RES_ID
    ) = SR.STARES_STA_DATE`;

    if (status !== null && status.length > 0)
      where +=
        where === ''
          ? `where SR.STARES_STA_ID IN (${status.map(e => +e).join(', ')})
            `
          : ` AND SR.STARES_STA_ID IN (${status.map(e => +e).join(', ')})
          `;
    if (empresaId !== null) where += where === '' ? `where S.SAL_EMP_ID = ${empresaId}` : ` AND S.SAL_EMP_ID = ${empresaId}`;
    if (usuarioId !== null) where += where === '' ? `where R.RES_USU_ID = ${usuarioId}` : ` AND R.RES_USU_ID = ${usuarioId}`;
    if (salaId !== null) where += where === '' ? `where R.RES_SAL_ID = ${salaId}` : ` AND R.RES_SAL_ID = ${salaId}`;
    if (dia !== null) where += where === '' ? `where R.RES_DIASEMANAINDEX = ${dia}` : ` AND R.RES_DIASEMANAINDEX = ${dia}`;
    if (hInicio !== null) where += where === '' ? `where R.RES_HRINICIO = '${hInicio}'` : ` AND R.RES_HRINICIO = '${hInicio}'`;
    if (hFim !== null) where += where === '' ? `where R.RES_HRFIM = '${hFim}'` : ` AND R.RES_HRFIM = '${hFim}'`;
    if (texto !== null)
      where +=
        where === ''
          ? `where (P.PES_NAME LIKE '%${texto}%' OR U.USU_LOGIN LIKE '%${texto}%')`
          : ` AND (P.PES_NAME LIKE '%${texto}%' OR U.USU_LOGIN LIKE '%${texto}%')`;
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
      ) as status,
      ${this.mapRawToUserEntity()},
      ${this.mapRawToPersonEntity()},
      ${this.mapRawToCompanyEntity()},
      S.SAL_NOME as salaNome
      FROM RESERVA AS R
      INNER JOIN SALA AS S on S.SAL_ID = R.RES_SAL_ID
      INNER JOIN USUARIO AS U on U.USU_ID = R.RES_USU_ID
      INNER JOIN PESSOA AS P on U.USU_PES_ID = P.PES_ID
      INNER JOIN EMPRESA AS E on S.SAL_EMP_ID = E.EMP_ID
      INNER JOIN STATUS_RESERVA AS SR on SR.STARES_RES_ID = R.RES_ID
      ${where}
      order by ${this.getOneRawNameOfEntityName(paginationConfig.orderColumn)} ${paginationConfig.order}
    limit ${paginationConfig.take} offset ${paginationConfig.skip}`;

    console.log('query =>', query);
    const rawData: any[] = await ReservaEntity.query(query);
    const results = this.mapRawDataToNestedObject(rawData);

    const total = await ReservaEntity.query(`SELECT
    count(RES_ID) as total
      FROM RESERVA AS R
      INNER JOIN SALA AS S on S.SAL_ID = R.RES_SAL_ID
      INNER JOIN USUARIO AS U on U.USU_ID = R.RES_USU_ID
      INNER JOIN PESSOA AS P on U.USU_PES_ID = P.PES_ID
      INNER JOIN EMPRESA AS E on S.SAL_EMP_ID = E.EMP_ID
      INNER JOIN STATUS_RESERVA AS SR on SR.STARES_RES_ID = R.RES_ID
    ${where}
      `);

    // ${this.getOneRawNameOfEntityName(paginationConfig.orderColumn)}
    console.log('total', total);
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
      null,
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

    const { data: bookingCreatedFinder } = await this.findBookingByFilter(
      paginationConfig,
      null,
      null,
      ['1', '2'],
      bookingData.salaId,
      bookingData.diaSemanaIndex,
      bookingData.horaInicio,
      bookingData.horaFim,
      bookingData.date,
      null,
    );
    const bookingCreated: any = bookingCreatedFinder[0];
    console.log('bookingCreated', bookingCreated);

    const clientTemplateData: {
      company: string;
      room: string;
      date: string;
      hour: string;
    } = {
      company: bookingCreated.empresa.nome,
      room: bookingCreated.salaNome,
      date: format(new Date(bookingCreated.date), 'dd/MM/y'),
      hour: bookingCreated.horaInicio + ' - ' + bookingCreated.horaFim,
    };
    await sendBookingClientEmail(bookingCreated.usuario.login, clientTemplateData);

    const companyTemplateData: {
      client: string;
      clientEmail: string;
      room: string;
      date: string;
      hour: string;
    } = {
      client: bookingCreated.pessoa.nome,
      clientEmail: bookingCreated.usuario.login,
      room: bookingCreated.salaNome,
      date: format(new Date(bookingCreated.date), 'dd/MM/y'),
      hour: bookingCreated.horaInicio + ' - ' + bookingCreated.horaFim,
    };
    const resps = await this.responsavelService.findAllResponsibleByRommWithUsers(bookingData.salaId);
    const dests = resps.map(el => el.usuario.login);
    await sendBookingCompanyEmail(dests[0], companyTemplateData);

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

  private mapRawToUserEntity() {
    return `
    U.USU_ID as usu_id,
    U.USU_LOGIN as usu_login,
    U.USU_SENHA as usu_senha,
    U.USU_STATUS as usu_status,
    U.USU_RESETCODE as usu_resetPasswordCode,
    U.USU_PUSHTOKEN as usu_pushToken,
    U.USU_USERINCLUI as usu_userCreated,
    U.USU_DTAINCLUI as usu_dateCreated,
    U.USU_USERALTERA as usu_userUpdated,
    U.USU_DTAALTERA as usu_dateUpdated,
    U.USU_PER_ID as usu_permissaoId,
    U.USU_EMP_ID as usu_empresaId,
    U.USU_PES_ID as usu_pessoaId
    `;
  }
  private mapRawToPersonEntity() {
    return `
    P.PES_ID as pes_id,
    P.PES_NAME as pes_nome,
    P.PES_CPFCNPJ as pes_cpfCnpj,
    P.PES_FUNCAO as pes_funcao,
    P.PES_MUNICIPIO as pes_municipio,
    P.PES_ESTADO as pes_estado,
    P.PES_PAIS as pes_pais,
    P.PES_ENDERECO as pes_endereco,
    P.PES_NUMERO as pes_numero,
    P.PES_TELEFONE as pes_telefone,
    P.PES_CEP as pes_cep,
    P.PES_DATANASCIMENTO as pes_dataNascimento,
    P.PES_FOTO as pes_foto,
    P.PES_USUINCLUI as pes_userCreated,
    P.PES_DTAINCLUI as pes_dateCreated,
    P.PES_USUALTERA as pes_userUpdated,
    P.PES_DTAALTERA as pes_dateUpdated
    `;
  }
  private mapRawToCompanyEntity() {
    return `
    E.EMP_ID as emp_id,
    E.EMP_LOGOURL as emp_logo,
    E.EMP_NOME as emp_nome,
    E.EMP_TELEFONE as emp_telefone,
    E.EMP_CPFCNPJ as emp_cpfCnpj,
    E.EMP_MUNICIPIO as emp_municipio,
    E.EMP_ESTADO as emp_estado,
    E.EMP_PAIS as emp_pais,
    E.EMP_ENDERECO as emp_endereco,
    E.EMP_NUMEROENDERECO as emp_numeroEndereco,
    E.EMP_CEP as emp_cep,
    E.EMP_CATEMP_ID as emp_categoriaId,
    E.EMP_USERINCLUI as emp_userCreated,
    E.EMP_DTAINCLUI as emp_dateCreated,
    E.EMP_USERALTERA as emp_userUpdated,
    E.EMP_DTAALTERA as emp_dateUpdated
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

  private mapRawDataToNestedObject(rawData: any[]): any {
    return rawData.map(item => {
      const ret: any = {
        usuario: {},
        pessoa: {},
        empresa: {},
      };
      const entries = Object.entries(item);
      entries.forEach(([prop, value]) => {
        if (prop.includes('usu_')) {
          ret.usuario[prop.replace('usu_', '')] = value;
        } else if (prop.includes('pes_')) {
          ret.pessoa[prop.replace('pes_', '')] = value;
        } else if (prop.includes('emp_')) {
          ret.empresa[prop.replace('emp_', '')] = value;
        } else {
          ret[prop] = value;
        }
      });

      return ret;
    });
  }
}

export default ReservaService;
