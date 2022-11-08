import { Router } from 'express';
import DisponibilidadeController from '@controllers/disponibilidade.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { DisponibilidadeCreateDTO, DisponibilidadeUpdateDTO } from '@/dtos/disponibilidade.dto';

class DisponibilidadeRoute implements Routes {
  public path = '/disponibilidade';
  public router = Router();
  public disponibilidadeController = new DisponibilidadeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.disponibilidadeController.getAvailabilities);
    this.router.get(`${this.path}/:id(\\d+)`, this.disponibilidadeController.getAvailabilityById);
    this.router.get(`${this.path}/sala/:room(\\d+)`, this.disponibilidadeController.getAvailabilityByRoom);
    this.router.post(`${this.path}`, validationMiddleware(DisponibilidadeCreateDTO, 'body'), this.disponibilidadeController.createAvailability);
    this.router.post(`${this.path}/many`, this.disponibilidadeController.createManyAvailability);
    this.router.put(`${this.path}/many`, this.disponibilidadeController.updateAvailabilityMany);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(DisponibilidadeUpdateDTO, 'body', true),
      this.disponibilidadeController.updateAvailability,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.disponibilidadeController.deleteAvailability);
  }
}

export default DisponibilidadeRoute;
