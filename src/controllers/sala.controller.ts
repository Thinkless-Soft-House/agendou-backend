import { NextFunction, Request, Response } from 'express';
import { SalaCreateDTO, SalaUpdateDTO } from '@dtos/sala.dto';
import { Sala } from '@interfaces/sala.interface';
import SalaService from '@/services/sala.service';
import { PaginationConfig } from '@/interfaces/utils.interface';
import { createPaginationConfig } from '@/utils/util';

class SalaController {
  public salaService = new SalaService();

  public getRomm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllRommData: Sala[] = await this.salaService.findAllRomm();

      res.status(200).json({ data: findAllRommData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRommById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rommId = Number(req.params.id);
      const findOneRommData: Sala = await this.salaService.findRommById(rommId);

      res.status(200).json({ data: findOneRommData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getRommByCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = Number(req.params.id);
      const paginationConfig: PaginationConfig = createPaginationConfig(req);

      const findRommsForCompany: {
        data: Sala[];
        total: number;
      } = await this.salaService.findRommByCompany(companyId, paginationConfig);

      res.status(200).json({ data: findRommsForCompany, message: 'findByCompany' });
    } catch (error) {
      next(error);
    }
  };

  public getRoomByFilter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paginationConfig: PaginationConfig = createPaginationConfig(req);

      const roomName = (req.query.nomeSala as string) || null;
      const companyId = +(req.query.empresaId as string) || null;

      const findOneCompanyData: {
        data: Sala[];
        total: number;
      } = await this.salaService.findRommByFilter(paginationConfig, roomName, companyId);

      res.status(200).json({ data: findOneCompanyData, message: 'findByFilter' });
    } catch (error) {
      next(error);
    }
  };

  public createRomm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rommData: SalaCreateDTO = req.body;
      const createRommData: Sala = await this.salaService.createRomm(rommData);

      res.status(201).json({ data: createRommData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRomm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rommId = Number(req.params.id);
      const rommData: SalaUpdateDTO = req.body;
      const updateRommData: Sala = await this.salaService.updateRomm(rommId, rommData);

      res.status(200).json({ data: updateRommData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRomm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rommId = Number(req.params.id);
      const deleteRommData: Sala = await this.salaService.deleteRomm(rommId);

      res.status(200).json({ data: deleteRommData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SalaController;
