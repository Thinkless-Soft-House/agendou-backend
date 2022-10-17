import { Router } from 'express';
import SalaController from '@controllers/sala.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { SalaCreateDTO, SalaUpdateDTO } from '@/dtos/sala.dto';

class SalaRoute implements Routes {
  public path = '/sala';
  public router = Router();
  public salaController = new SalaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.salaController.getRomm);
    this.router.get(`${this.path}/:id(\\d+)`, this.salaController.getRommById);
    this.router.post(`${this.path}`, validationMiddleware(SalaCreateDTO, 'body'), this.salaController.createRomm);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(SalaUpdateDTO, 'body', true), this.salaController.updateRomm);
    this.router.delete(`${this.path}/:id(\\d+)`, this.salaController.deleteRomm);
  }
}

export default SalaRoute;
