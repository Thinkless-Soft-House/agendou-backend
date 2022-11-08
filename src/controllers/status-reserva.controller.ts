import { NextFunction, Request, Response } from 'express';
import { StatusReservaCreateDTO, StatusReservaUpdateDTO } from '@dtos/status-reserva.dto';
import { StatusReserva } from '@interfaces/status-reserva.interface';
import StatusReservaService from '@/services/status-reserva.service';

class StatusReservaController {
  public statusReservaService = new StatusReservaService();

  public getBookingStatusStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBookingStatusStatusData: StatusReserva[] = await this.statusReservaService.findAllBookingStatus();

      res.status(200).json({ data: findAllBookingStatusStatusData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookingStatusById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingStatusId = Number(req.params.id);
      const findOneBookingStatusData: StatusReserva = await this.statusReservaService.findBookingStatusById(bookingStatusId);

      res.status(200).json({ data: findOneBookingStatusData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getBookingStatusByBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.booking);
      const findOneBookingStatusData: StatusReserva[] = await this.statusReservaService.findBookingStatusByBooking(bookingId);

      res.status(200).json({ data: findOneBookingStatusData, message: 'findByBooking' });
    } catch (error) {
      next(error);
    }
  };

  public createBookingStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingStatusData: StatusReservaCreateDTO = req.body;
      const createBookingStatusData: StatusReserva = await this.statusReservaService.createBookingStatus(bookingStatusData);

      res.status(201).json({ data: createBookingStatusData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBookingStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingStatusId = Number(req.params.id);
      const bookingStatusData: StatusReservaUpdateDTO = req.body;
      const updateBookingStatusData: StatusReserva = await this.statusReservaService.updateBookingStatus(bookingStatusId, bookingStatusData);

      res.status(200).json({ data: updateBookingStatusData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBookingStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingStatusId = Number(req.params.id);
      const deleteBookingStatusData: StatusReserva = await this.statusReservaService.deleteBookingStatus(bookingStatusId);

      res.status(200).json({ data: deleteBookingStatusData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default StatusReservaController;
