import { NextFunction, Request, Response } from 'express';
import { UsuarioCreateDTO, UsuarioLoginDTO } from '@dtos/usuario.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Usuario } from '@interfaces/usuario.interface';
import AuthService from '@services/auth.service';
import { HttpException } from '@/exceptions/HttpException';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UsuarioCreateDTO = req.body;
      const signUpUserData: Usuario = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UsuarioLoginDTO = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logInWithKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: { login: string; key: string } = req.body;

      if (userData.key !== process.env.KEY) {
        console.log('Chave inválida');
        throw new HttpException(401, 'Chave inválida');
      }
      const { cookie, findUser } = await this.authService.loginWithKey(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email: string = req.body.login;
      const user = await this.authService.forgotPassword(email);

      res.status(200).json({ data: user, message: 'forgotPassword' });
    } catch (error) {
      next(error);
    }
  };
  public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email: string = req.body.login;
      const code = Number(req.body.codigo);
      const password: string = req.body.novaSenha;
      const user = await this.authService.resetPassword(email, code, password);

      res.status(200).json({ data: user, message: 'forgotPassword' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: Usuario = req.user;
      const logOutUserData: Usuario = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
  public verifyToken = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token: string = req.body.token;
      const verifyToken: boolean = await this.authService.verifyToken(token);

      res.status(200).json({ data: verifyToken, message: 'verifyToken' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
