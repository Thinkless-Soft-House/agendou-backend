import { NextFunction, Request, Response } from 'express';
import { EmpresaCreateDTO, EmpresaUpdateDTO } from '@dtos/empresa.dto';
import { Empresa } from '@interfaces/empresa.interface';
import EmpresaService from '@/services/empresa.service';
import { PaginationConfig } from '@/interfaces/utils.interface';
import { createPaginationConfig } from '@/utils/util';

class EmpresaController {
  public empresaService = new EmpresaService();

  public getCompanies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCompaniesData: Empresa[] = await this.empresaService.findAllCompany();

      res.status(200).json({ data: findAllCompaniesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCompanyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = Number(req.params.id);
      const findOneCompanyData: Empresa = await this.empresaService.findCompanyById(companyId);

      res.status(200).json({ data: findOneCompanyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getCompanyByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = Number(req.params.id);
      const paginationConfig: PaginationConfig = createPaginationConfig(req);

      const findOneCompanyData: {
        data: Empresa[];
        total: number;
      } = await this.empresaService.findCompanyByCategory(categoryId, paginationConfig);

      res.status(200).json({ data: findOneCompanyData, message: 'findOneByCategory' });
    } catch (error) {
      next(error);
    }
  };

  public getCompanyByFilter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paginationConfig: PaginationConfig = createPaginationConfig(req);

      const categoryId = Number(req.query.categoriaId) || null;
      const haveRooms = !!(req.query.possuiSala as string) || null;
      const companyName = (req.query.nomeEmpresa as string) || null;

      const findOneCompanyData: {
        data: Empresa[];
        total: number;
      } = await this.empresaService.findCompanyByFilter(paginationConfig, haveRooms, companyName, categoryId);

      res.status(200).json({ data: findOneCompanyData, message: 'findOneByCategory' });
    } catch (error) {
      next(error);
    }
  };

  public createCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyData: EmpresaCreateDTO = req.body;
      const createCompanyData: Empresa = await this.empresaService.createCompany(companyData);

      res.status(201).json({ data: createCompanyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = Number(req.params.id);
      const companyData: EmpresaUpdateDTO = req.body;
      const updateCompanyData: Empresa = await this.empresaService.updateCompany(companyId, companyData);

      res.status(200).json({ data: updateCompanyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = Number(req.params.id);
      const deleteCompanyData: Empresa = await this.empresaService.deleteCompany(companyId);

      res.status(200).json({ data: deleteCompanyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default EmpresaController;
