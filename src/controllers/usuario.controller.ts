import { NextFunction, Request, Response } from 'express';
import { UsuarioCreateDTO, UsuarioUpdateDTO } from '@dtos/usuario.dto';
import { Usuario } from '@interfaces/usuario.interface';
import UsuarioService from '@/services/usuario.service';
import { PaginationConfig } from '@/interfaces/utils.interface';
import { createPaginationConfig } from '@/utils/util';

class UsersController {
  public usuarioService = new UsuarioService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: Usuario[] = await this.usuarioService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: Usuario = await this.usuarioService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getUserByCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = Number(req.params.id);
      const paginationConfig: PaginationConfig = createPaginationConfig(req);

      const findUsersForCompany: {
        data: Usuario[];
        total: number;
      } = await this.usuarioService.findUserByCompany(companyId, paginationConfig);

      res.status(200).json({ data: findUsersForCompany, message: 'findByCompany' });
    } catch (error) {
      next(error);
    }
  };

  public getUserByPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const permissionId = Number(req.params.id);
      const paginationConfig: PaginationConfig = createPaginationConfig(req);

      const findUsersForCompany: {
        data: Usuario[];
        total: number;
      } = await this.usuarioService.findUserByPermission(permissionId, paginationConfig);

      res.status(200).json({ data: findUsersForCompany, message: 'findByPermission' });
    } catch (error) {
      next(error);
    }
  };

  public getUserByFilter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paginationConfig: PaginationConfig = createPaginationConfig(req);

      const username = (req.query.nomeUsuario as string) || null;
      const email = (req.query.login as string) || null;
      const companyId = +(req.query.empresaId as string) || null;
      const permissionId = +(req.query.permissaoId as string) || null;

      const findOneCompanyData: {
        data: Usuario[];
        total: number;
      } = await this.usuarioService.findUserByFilter(paginationConfig, username, email, companyId, permissionId);

      res.status(200).json({ data: findOneCompanyData, message: 'findByFilter' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UsuarioCreateDTO = req.body;
      const createUserData: Usuario = await this.usuarioService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public createUserWithoutPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UsuarioCreateDTO = req.body;
      const createUserData: Usuario = await this.usuarioService.createUserWithoutPassword(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePushToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const token: string = req.body.token;
      const updateUserData: Usuario = await this.usuarioService.updatePushNotificationToken(userId, token);

      res.status(200).json({ data: updateUserData, message: 'updatedToken' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: UsuarioUpdateDTO = req.body;
      const updateUserData: Usuario = await this.usuarioService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: Usuario = await this.usuarioService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
