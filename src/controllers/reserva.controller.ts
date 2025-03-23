import { NextFunction, Request, Response } from 'express';
import { ReservaCreateDTO, ReservaUpdateDTO } from '@dtos/reserva.dto';
import { Reserva } from '@interfaces/reserva.interface';
import ReservaService from '@/services/reserva.service';
import { SalaEntity } from '@/entities/sala.entity';
import { Sala } from '@/interfaces/sala.interface';
import { PaginationConfig } from '@/interfaces/utils.interface';
import { createCSV, createPaginationConfig } from '@/utils/util';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { EmpresaEntity } from '@/entities/empresa.entity';
import { Empresa } from '@/interfaces/empresa.interface';

import * as fs from 'fs';
import { sendGenerateReportEmail } from '@/utils/sendEmail';
import { sendBookingClientEmail } from '@/utils/sendEmail';
import { format } from 'date-fns';
import { Usuario } from '@/interfaces/usuario.interface';
import { UsuarioEntity } from '@/entities/usuario.entity';
import { SimpleConsoleLogger } from 'typeorm';
import { sendAppointmentConfirmationEmail } from '@/utils/sendEmail';

class ReservaController {
  public reservaService = new ReservaService();

  public getBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paginationConfig: PaginationConfig = createPaginationConfig(req);
      const findAllBookingsData: Reserva[] = await this.reservaService.findAllBooking(paginationConfig);

      res.status(200).json({ data: findAllBookingsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.id);
      const findOneBookingData: Reserva = await this.reservaService.findBookingById(bookingId);

      res.status(200).json({ data: findOneBookingData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getBookingByRoomAndDate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roomId = Number(req.params.id);
      const month = Number(req.params.mes);
      const year = Number(req.params.ano);
      const findBookings: Reserva[] = await this.reservaService.findBookingByRoomAndDate(roomId, month, year);

      res.status(200).json({ data: findBookings, message: 'findBookingByRoomAndDate' });
    } catch (error) {
      next(error);
    }
  };

  public getBookingByFilter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paginationConfig: PaginationConfig = createPaginationConfig(req);

      const companyId = +(req.query.empresaId as string) || null;
      const userId = +(req.query.usuarioId as string) || null;
      const status = (req.query.status as string) || null;
      const salaId = +(req.query.salaId as string) || null;
      const dia = +(req.query.dia as string) || null;
      const hInicio = (req.query.hinicio as string) || null;
      const hFim = (req.query.hfim as string) || null;
      const data = (req.query.data as string) || null;
      const texto = (req.query.texto as string) || null;

      const statusList = !!status ? status.split(',') : [];

      const findOneCompanyData: {
        data: Reserva[];
        total: number;
      } = await this.reservaService.findBookingByFilter(paginationConfig, userId, companyId, statusList, salaId, dia, hInicio, hFim, data, texto);
      console.log('findOneCompanyData', findOneCompanyData);
      res.status(200).json({ data: findOneCompanyData, message: 'findByFilter' });
    } catch (error) {
      next(error);
    }
  };

  public createBooking = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
      const bookingData: ReservaCreateDTO = req.body;
      console.log('bookingData', JSON.stringify(bookingData));
      const createBookingData: Reserva = await this.reservaService.createBooking(bookingData);
      const findUser: Usuario = await UsuarioEntity.findOne({ where: { id: createBookingData.usuarioId } });
      const findRoom: Sala = await SalaEntity.findOne({ where: { id: createBookingData.salaId }, relations: ['empresa'] });const emailResponse = await sendBookingClientEmail(findUser.login, findRoom.empresa.nome)
      console.log("Email enviado:", emailResponse);
      res.status(201).json({ data: createBookingData, message: 'created', email: emailResponse });
    } catch (error) {
      next(error);
    }
  };

  public updateBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.id);
      const bookingData: ReservaUpdateDTO = req.body;
      const updateBookingData: Reserva = await this.reservaService.updateBooking(bookingId, bookingData);

      res.status(200).json({ data: updateBookingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.id);
      const deleteBookingData: Reserva = await this.reservaService.deleteBooking(bookingId);

      res.status(200).json({ data: deleteBookingData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public downloadReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filename = req.params.filename;
      const path = `./files/reports/${filename}`;

      // Verifique se o arquivo existe antes de tentar enviá-lo
      fs.access(path, fs.constants.F_OK, err => {
        if (err) {
          console.log(`${path} ${err ? 'does not exist' : 'exists'}`);
          res.status(404).json({ message: 'Arquivo não encontrado.' });
        } else {
          res.download(path); // Configura a resposta para baixar o arquivo
        }
      });
    } catch (error) {
      next(error);
    }
  };

  public generateReport = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: {
        usuarioId: number;
        start: string;
        end: string;
      } = req.body;
      const paginationConfig: PaginationConfig = createPaginationConfig(req);
      paginationConfig.take = 1000000;

      // const usuarioId = +(body.usuarioId as number) || null;
      const dataInicio = (body.start as string) || null;
      const dataFim = (body.end as string) || null;
      if (!dataInicio || !dataFim) {
        res.status(400).json({ message: 'Informe a data de início e fim.' });
        return;
      }

      // Pegar o usuario e seu tipo
      console.log('Usuario que solicitou => ', req.user.id);
      if (!req.user) {
        res.status(400).json({ message: 'Usuário não encontrado.' });
        return;
      }

      let empresaId = null;

      if (req.user.permissaoId === 3) {
        empresaId = req.user.empresaId || null;
      } else if (req.user.permissaoId === 2) {
        empresaId = req.body.empresaId || null;
      }

      // empresaId = 2;


      const findOneCompanyData: {
        data: Reserva[];
        total: number;
      } = await this.reservaService.findBookingByFilterBetweenDates(
        paginationConfig,
        null,
        empresaId,
        null,
        null,
        null,
        null,
        null,
        dataInicio,
        dataFim,
        null,
      );

      console.log('Quantidade encontrada => ', findOneCompanyData.data.length);
      console.log('Quantidade encontrada => ', findOneCompanyData.total);

      if (!findOneCompanyData || !findOneCompanyData.data || findOneCompanyData.data.length === 0) {
        res.status(404).json({ ok: false, message: 'Nenhum dado encontrado para gerar o relatório.' });
        return;
      }

      const fileConfig = {
        filename:
          `Relatorio_Agendou Aí?_Cliente_${req.user.id}_Datas_` +
          format(new Date(dataFim), 'dd-MM-yyyy') +
          '_a_' +
          format(new Date(dataInicio), 'dd-MM-yyyy') +
          `_Criado_${format(new Date(), 'dd-MM-yyyy')}` +
          '.csv',
        path: './files/reports/',
        save: true,
      };
      const reportData = await this.reservaService.createReportData(findOneCompanyData.data);
      createCSV(reportData, fileConfig);

      // Constrói a URL base usando req.protocol e req.get('host')
      const baseUrl = req.protocol + '://' + req.get('host');

      // Constrói a URL completa para o arquivo
      const fileUrl = `${baseUrl}/reserva/report/download/${fileConfig.filename}`;

      // Chama a função para enviar o email com a URL do arquivo
      const emailResponse = await sendGenerateReportEmail(req.user.login, fileUrl);
      console.log("Email enviado:", emailResponse);
      res.status(200).json({ ok: true, message: "Relatório gerado com sucesso.", email: emailResponse });
      return;
    } catch (error) {
      next(error);
    }
  };
}

export default ReservaController;
