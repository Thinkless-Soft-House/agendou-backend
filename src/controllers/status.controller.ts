import { NextFunction, Request, Response } from 'express';
import { StatusCreateDTO, StatusUpdateDTO } from '@dtos/status.dto';
import { Status } from '@interfaces/status.interface';
import StatusService from '@/services/status.service';

class StatusController {
  public statusService = new StatusService();

  public getStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllStatusData: Status[] = await this.statusService.findAllStatus();

      res.status(200).json({ data: findAllStatusData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStatusById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.id);
      const findOneStatusData: Status = await this.statusService.findStatusById(bookingId);

      res.status(200).json({ data: findOneStatusData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingData: StatusCreateDTO = req.body;
      const createStatusData: Status = await this.statusService.createStatus(bookingData);

      res.status(201).json({ data: createStatusData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.id);
      const bookingData: StatusUpdateDTO = req.body;
      const updateStatusData: Status = await this.statusService.updateStatus(bookingId, bookingData);

      res.status(200).json({ data: updateStatusData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = Number(req.params.id);
      const deleteStatusData: Status = await this.statusService.deleteStatus(bookingId);

      res.status(200).json({ data: deleteStatusData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default StatusController;
