import { NextFunction, Request, Response } from 'express';
import { CategoriaEmpresaCreateDTO, CategoriaEmpresaUpdateDTO } from '@dtos/categoria-empresa.dto';
import { CategoriaEmpresa } from '@interfaces/categoria-empresa.interface';
import CategoriaEmpresaService from '@/services/categoria-empresa.service';

class CategoriaEmpresaController {
  public categoriaEmpresaService = new CategoriaEmpresaService();

  public getCategoriaEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCategoriaEmpresaData: CategoriaEmpresa[] = await this.categoriaEmpresaService.findAllCategoriaEmpresa();

      res.status(200).json({ data: findAllCategoriaEmpresaData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCategoriaEmpresaById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.id);
      const findOneCategoriaEmpresaData: CategoriaEmpresa = await this.categoriaEmpresaService.findCategoriaEmpresaById(bookingId);

      res.status(200).json({ data: findOneCategoriaEmpresaData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCategoriaEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingData: CategoriaEmpresaCreateDTO = req.body;
      const createCategoriaEmpresaData: CategoriaEmpresa = await this.categoriaEmpresaService.createCategoriaEmpresa(bookingData);

      res.status(201).json({ data: createCategoriaEmpresaData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCategoriaEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.id);
      const bookingData: CategoriaEmpresaUpdateDTO = req.body;
      const updateCategoriaEmpresaData: CategoriaEmpresa = await this.categoriaEmpresaService.updateCategoriaEmpresa(bookingId, bookingData);

      res.status(200).json({ data: updateCategoriaEmpresaData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategoriaEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.id);
      const deleteCategoriaEmpresaData: CategoriaEmpresa = await this.categoriaEmpresaService.deleteCategoriaEmpresa(bookingId);

      res.status(200).json({ data: deleteCategoriaEmpresaData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getEmpresasByCategoriaId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoriaId = Number(req.params.id);
      const empresas = await this.categoriaEmpresaService.getEmpresasByCategoriaId(categoriaId);

      res.status(200).json({ data: empresas, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriaEmpresaController;
