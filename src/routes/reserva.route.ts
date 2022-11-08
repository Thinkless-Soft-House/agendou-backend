import { Router } from 'express';
import ReservaController from '@controllers/reserva.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { ReservaCreateDTO, ReservaUpdateDTO } from '@/dtos/reserva.dto';

class ReservaRoute implements Routes {
  public path = '/reserva';
  public router = Router();
  public reservaController = new ReservaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.reservaController.getBookings);
    this.router.get(`${this.path}/:id(\\d+)`, this.reservaController.getBookingById);
    this.router.get(`${this.path}/sala/mes/:id(\\d+)/:mes(\\d+)/:ano(\\d+)`, this.reservaController.getBookingByRoomAndDate);
    this.router.get(`${this.path}/filter`, this.reservaController.getBookingByFilter);
    this.router.post(`${this.path}`, validationMiddleware(ReservaCreateDTO, 'body'), this.reservaController.createBooking);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(ReservaUpdateDTO, 'body', true), this.reservaController.updateBooking);
    this.router.delete(`${this.path}/:id(\\d+)`, this.reservaController.deleteBooking);
  }
}

export default ReservaRoute;
