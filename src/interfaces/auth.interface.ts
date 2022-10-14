import { Request } from 'express';
import { Usuario } from '@interfaces/usuario.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: Usuario;
}
