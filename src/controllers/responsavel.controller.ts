import { NextFunction, Request, Response } from 'express';
import { ResponsavelCreateDTO, ResponsavelUpdateDTO } from '@dtos/responsavel.dto';
import { Responsavel } from '@interfaces/responsavel.interface';
import ResponsavelService from '@/services/responsavel.service';

class ResponsavelController {
  public responsavelService = new ResponsavelService();

  public getResponsible = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllResponsibleData: Responsavel[] = await this.responsavelService.findAllResponsible();

      res.status(200).json({ data: findAllResponsibleData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getResponsibleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const responsibleId = Number(req.params.id);
      const findOneResponsibleData: Responsavel = await this.responsavelService.findResponsibleById(responsibleId);

      res.status(200).json({ data: findOneResponsibleData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createResponsible = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const responsibleData: ResponsavelCreateDTO = req.body;
      const createResponsibleData: Responsavel = await this.responsavelService.createResponsible(responsibleData);

      res.status(201).json({ data: createResponsibleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateResponsible = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const responsibleId = Number(req.params.id);
      const responsibleData: ResponsavelUpdateDTO = req.body;
      const updateResponsibleData: Responsavel = await this.responsavelService.updateResponsible(responsibleId, responsibleData);

      res.status(200).json({ data: updateResponsibleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteResponsible = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const responsibleId = Number(req.params.id);
      const deleteResponsibleData: Responsavel = await this.responsavelService.deleteResponsible(responsibleId);

      res.status(200).json({ data: deleteResponsibleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ResponsavelController;
