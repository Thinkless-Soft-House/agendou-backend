import { Router } from 'express';
import EmpresaController from '@controllers/empresa.controller';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { EmpresaCreateDTO, EmpresaUpdateDisponibilidadeDTO, EmpresaUpdateDTO } from '@/dtos/empresa.dto';

class EmpresaRoute implements Routes {
  public path = '/empresa';
  public router = Router();
  public empresaController = new EmpresaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.empresaController.getCompanies);
    this.router.get(`${this.path}/:id(\\d+)`, this.empresaController.getCompanyById);
    this.router.get(`${this.path}/filter`, this.empresaController.getCompanyByFilter);
    this.router.get(`${this.path}/categoria/:id(\\d+)`, this.empresaController.getCompanyByCategory);
    this.router.get(`${this.path}/estatisticas`, this.empresaController.getEmpresaEstatisticas);
    this.router.post(`${this.path}`, validationMiddleware(EmpresaCreateDTO, 'body'), this.empresaController.createCompany);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(EmpresaUpdateDTO, 'body', true), this.empresaController.updateCompany);
    this.router.delete(`${this.path}/:id(\\d+)`, this.empresaController.deleteCompany);
    this.router.post(`${this.path}/web`, validationMiddleware(EmpresaCreateDTO, 'body'), this.empresaController.createCompanyWeb);
    this.router.put(
      `${this.path}/disponibilidade/:id(\\d+)`,
      validationMiddleware(EmpresaUpdateDisponibilidadeDTO, 'body', true),
      this.empresaController.updateDisponibilidade,
    );
  }
}

export default EmpresaRoute;
