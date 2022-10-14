import { Router } from 'express';
import PermissaoController from '@controllers/permissao.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { PermissaoCreateDTO, PermissaoUpdateDTO } from '@/dtos/permissao.dto';

class PermissaoRoute implements Routes {
  public path = '/permissao';
  public router = Router();
  public permissaoController = new PermissaoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.permissaoController.getPermissao);
    this.router.get(`${this.path}/:id(\\d+)`, this.permissaoController.getPermisaoById);
    this.router.post(`${this.path}`, validationMiddleware(PermissaoCreateDTO, 'body'), this.permissaoController.createPermissao);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(PermissaoUpdateDTO, 'body', true), this.permissaoController.updatePermissao);
    this.router.delete(`${this.path}/:id(\\d+)`, this.permissaoController.deletePermissao);
  }
}

export default PermissaoRoute;
