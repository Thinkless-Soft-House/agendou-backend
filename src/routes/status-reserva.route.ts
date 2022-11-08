import { Router } from 'express';
import StatusReservaController from '@controllers/status-reserva.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { StatusReservaCreateDTO, StatusReservaUpdateDTO } from '@/dtos/status-reserva.dto';

class StatusReservaRoute implements Routes {
  public path = '/statusReserva';
  public router = Router();
  public statusReservaController = new StatusReservaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.statusReservaController.getBookingStatusStatus);
    this.router.get(`${this.path}/:id(\\d+)`, this.statusReservaController.getBookingStatusById);
    this.router.get(`${this.path}/reserva/:booking(\\d+)`, this.statusReservaController.getBookingStatusByBooking);
    this.router.post(`${this.path}`, validationMiddleware(StatusReservaCreateDTO, 'body'), this.statusReservaController.createBookingStatus);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(StatusReservaUpdateDTO, 'body', true),
      this.statusReservaController.updateBookingStatus,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.statusReservaController.deleteBookingStatus);
  }
}

export default StatusReservaRoute;
