import { NextFunction, Request, Response } from 'express';
import { ReservaCreateDTO, ReservaUpdateDTO } from '@dtos/reserva.dto';
import { Reserva } from '@interfaces/reserva.interface';
import ReservaService from '@/services/reserva.service';
import { PaginationConfig } from '@/interfaces/utils.interface';
import { createPaginationConfig } from '@/utils/util';

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
      const statusList = !!status ? status.split(',') : [];

      const findOneCompanyData: {
        data: Reserva[];
        total: number;
      } = await this.reservaService.findBookingByFilter(paginationConfig, userId, companyId, statusList, salaId, dia, hInicio, hFim, data);

      res.status(200).json({ data: findOneCompanyData, message: 'findByFilter' });
    } catch (error) {
      next(error);
    }
  };

  public createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingData: ReservaCreateDTO = req.body;
      const createBookingData: Reserva = await this.reservaService.createBooking(bookingData);

      res.status(201).json({ data: createBookingData, message: 'created' });
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
}

export default ReservaController;
