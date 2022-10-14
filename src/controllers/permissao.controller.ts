import { NextFunction, Request, Response } from 'express';
import { PermissaoCreateDTO, PermissaoUpdateDTO } from '@dtos/permissao.dto';
import { Permissao } from '@interfaces/permissao.interface';
import PermissaoService from '@services/permissao.service';

class PermissaoController {
  public permissaoService = new PermissaoService();

  public getPermissao = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPermissaoData: Permissao[] = await this.permissaoService.findAllPermission();

      res.status(200).json({ data: findAllPermissaoData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPermisaoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const permissionId = Number(req.params.id);
      const findOnePermissionData: Permissao = await this.permissaoService.findPermissionById(permissionId);

      res.status(200).json({ data: findOnePermissionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPermissao = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const permissionData: PermissaoCreateDTO = req.body;
      const createPermissionData: Permissao = await this.permissaoService.createPermission(permissionData);

      res.status(201).json({ data: createPermissionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePermissao = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const permissionId = Number(req.params.id);
      const permissionData: PermissaoUpdateDTO = req.body;
      const updatePermissionData: Permissao = await this.permissaoService.updatePermission(permissionId, permissionData);

      res.status(200).json({ data: updatePermissionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePermissao = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const permissionId = Number(req.params.id);
      const deletePermissionData: Permissao = await this.permissaoService.deletePermission(permissionId);

      res.status(200).json({ data: deletePermissionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PermissaoController;
