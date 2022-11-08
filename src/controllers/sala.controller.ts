import { NextFunction, Request, Response } from 'express';
import { SalaCreateDTO, SalaUpdateDTO } from '@dtos/sala.dto';
import { Sala } from '@interfaces/sala.interface';
import SalaService from '@/services/sala.service';
import { PaginationConfig } from '@/interfaces/utils.interface';
import { createPaginationConfig } from '@/utils/util';

class SalaController {
  public salaService = new SalaService();

  public getRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllRoomData: Sala[] = await this.salaService.findAllRoom();

      res.status(200).json({ data: findAllRoomData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRoomById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roomId = Number(req.params.id);
      const findOneRoomData: Sala = await this.salaService.findRoomById(roomId);

      res.status(200).json({ data: findOneRoomData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getRoomByCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = Number(req.params.id);
      const paginationConfig: PaginationConfig = createPaginationConfig(req);

      const findRoomsForCompany: {
        data: Sala[];
        total: number;
      } = await this.salaService.findRoomByCompany(companyId, paginationConfig);

      res.status(200).json({ data: findRoomsForCompany, message: 'findByCompany' });
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
      } = await this.salaService.findRoomByFilter(paginationConfig, roomName, companyId);

      res.status(200).json({ data: findOneCompanyData, message: 'findByFilter' });
    } catch (error) {
      next(error);
    }
  };

  public createRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roomData: SalaCreateDTO = req.body;
      const createRoomData: Sala = await this.salaService.createRoom(roomData);

      res.status(201).json({ data: createRoomData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roomId = Number(req.params.id);
      const roomData: SalaUpdateDTO = req.body;
      const updateRoomData: Sala = await this.salaService.updateRoom(roomId, roomData);

      res.status(200).json({ data: updateRoomData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roomId = Number(req.params.id);
      const deleteRoomData: Sala = await this.salaService.deleteRoom(roomId);

      res.status(200).json({ data: deleteRoomData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SalaController;
