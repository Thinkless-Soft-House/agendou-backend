import { Router } from 'express';
import PessoaController from '@controllers/pessoa.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { PessoaUpdateDTO } from '@/dtos/pessoa.dto';

class PessoaRoute implements Routes {
  public path = '/pessoa';
  public router = Router();
  public pessoaController = new PessoaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}`, this.pessoaController.getPerson);
    // this.router.get(`${this.path}/:id(\\d+)`, this.pessoaController.getPersonById);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(PessoaUpdateDTO, 'body', true), this.pessoaController.updatePerson);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.pessoaController.deletePerson);
  }
}

export default PessoaRoute;
