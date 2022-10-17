import { NextFunction, Request, Response } from 'express';
import { ReservaCreateDTO, ReservaUpdateDTO } from '@dtos/reserva.dto';
import { Reserva } from '@interfaces/reserva.interface';
import ReservaService from '@/services/reserva.service';

class ReservaController {
  public reservaService = new ReservaService();

  public getBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBookingsData: Reserva[] = await this.reservaService.findAllBooking();

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
