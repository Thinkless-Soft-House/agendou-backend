import { NextFunction, Request, Response } from 'express';
import { DisponibilidadeCreateDTO, DisponibilidadeUpdateDTO } from '@dtos/disponibilidade.dto';
import { Disponibilidade } from '@interfaces/disponibilidade.interface';
import DisponibilidadeService from '@/services/disponibilidade.service';

class DisponibilidadeController {
  public disponibilidadeService = new DisponibilidadeService();

  public getAvailabilities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAvailabilitiesData: Disponibilidade[] = await this.disponibilidadeService.findAllAvailability();

      res.status(200).json({ data: findAllAvailabilitiesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAvailabilityById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const availabilityId = Number(req.params.id);
      const findOneAvailabilityData: Disponibilidade = await this.disponibilidadeService.findAvailabilityById(availabilityId);

      res.status(200).json({ data: findOneAvailabilityData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const availabilityData: DisponibilidadeCreateDTO = req.body;
      const createAvailabilityData: Disponibilidade = await this.disponibilidadeService.createAvailability(availabilityData);

      res.status(201).json({ data: createAvailabilityData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public createManyAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const availabilityData: DisponibilidadeCreateDTO[] = req.body.disponibilidades;
      const createAvailabilityData: Disponibilidade[] = await this.disponibilidadeService.createManyAvailability(availabilityData);

      res.status(200).json({ data: createAvailabilityData, message: 'createdMany' });
    } catch (error) {
      next(error);
    }
  };

  public updateAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const availabilityId = Number(req.params.id);
      const availabilityData: DisponibilidadeUpdateDTO = req.body;
      const updateAvailabilityData: Disponibilidade = await this.disponibilidadeService.updateAvailability(availabilityId, availabilityData);

      res.status(200).json({ data: updateAvailabilityData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const availabilityId = Number(req.params.id);
      const deleteAvailabilityData: Disponibilidade = await this.disponibilidadeService.deleteAvailability(availabilityId);

      res.status(200).json({ data: deleteAvailabilityData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DisponibilidadeController;
