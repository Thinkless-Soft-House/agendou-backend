import { Router } from 'express';
import UsuarioController from '@controllers/usuario.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { UsuarioCreateDTO, UsuarioUpdateDTO } from '@/dtos/usuario.dto';

class UsuarioRoute implements Routes {
  public path = '/usuario';
  public router = Router();
  public usuarioController = new UsuarioController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usuarioController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.usuarioController.getUserById);
    this.router.get(`${this.path}/empresa/:id(\\d+)`, this.usuarioController.getUserByCompany);
    this.router.get(`${this.path}/permissao/:id(\\d+)`, this.usuarioController.getUserByPermission);
    this.router.get(`${this.path}/filter`, this.usuarioController.getUserByFilter);
    this.router.post(`${this.path}`, validationMiddleware(UsuarioCreateDTO, 'body'), this.usuarioController.createUser);
    this.router.post(`${this.path}/createWithoutPassword`, validationMiddleware(UsuarioCreateDTO, 'body'), this.usuarioController.createUserWithoutPassword);
    this.router.post(`${this.path}/pushToken/:id(\\d+)`, this.usuarioController.updatePushToken);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(UsuarioUpdateDTO, 'body', true), this.usuarioController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, this.usuarioController.deleteUser);
  }
}

export default UsuarioRoute;
