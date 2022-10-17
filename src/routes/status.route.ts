import { Router } from 'express';
import StatusController from '@controllers/status.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { StatusCreateDTO, StatusUpdateDTO } from '@/dtos/status.dto';

class StatusRoute implements Routes {
  public path = '/status';
  public router = Router();
  public statusController = new StatusController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.statusController.getStatus);
    this.router.get(`${this.path}/:id(\\d+)`, this.statusController.getStatusById);
    this.router.post(`${this.path}`, validationMiddleware(StatusCreateDTO, 'body'), this.statusController.createStatus);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(StatusUpdateDTO, 'body', true), this.statusController.updateStatus);
    this.router.delete(`${this.path}/:id(\\d+)`, this.statusController.deleteStatus);
  }
}

export default StatusRoute;
