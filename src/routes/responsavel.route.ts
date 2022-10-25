import { Router } from 'express';
import ResponsavelController from '@controllers/responsavel.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { ResponsavelCreateDTO, ResponsavelUpdateDTO } from '@/dtos/responsavel.dto';

class ResponsavelRoute implements Routes {
  public path = '/responsavel';
  public router = Router();
  public responsavelController = new ResponsavelController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.responsavelController.getResponsible);
    this.router.get(`${this.path}/:id(\\d+)`, this.responsavelController.getResponsibleById);
    this.router.post(`${this.path}`, validationMiddleware(ResponsavelCreateDTO, 'body'), this.responsavelController.createResponsible);
    this.router.post(`${this.path}/many`, this.responsavelController.createManyResponsible);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(ResponsavelUpdateDTO, 'body', true), this.responsavelController.updateResponsible);
    this.router.delete(`${this.path}/:id(\\d+)`, this.responsavelController.deleteResponsible);
  }
}

export default ResponsavelRoute;
