import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { EntityRepository, Repository } from 'typeorm';
import { SECRET_KEY } from '@config';
import { UsuarioCreateDTO, UsuarioLoginDTO } from '@dtos/usuario.dto';
import { UsuarioEntity } from '@entities/usuario.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Usuario } from '@interfaces/usuario.interface';
import { isEmpty } from '@utils/util';
import { sendForgotPasswordEmail } from '@/utils/sendEmail';

@EntityRepository()
class AuthService extends Repository<UsuarioEntity> {
  public async signup(userData: UsuarioCreateDTO): Promise<Usuario> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: userData.login } });
    if (findUser) throw new HttpException(409, `This email ${userData.login} already exists`);

    const hashedPassword = await hash(userData.senha, 10);
    const createUserData: Usuario = await UsuarioEntity.create({ ...userData, senha: hashedPassword }).save();
    return createUserData;
  }

  public async login(userData: UsuarioLoginDTO): Promise<{ cookie: string; findUser: Usuario }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: userData.login } });
    if (!findUser) throw new HttpException(409, `This email ${userData.login} was not found`);

    const isPasswordMatching: boolean = await compare(userData.senha, findUser.senha);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async forgotPassword(email: string): Promise<Usuario> {
    if (isEmpty(email)) throw new HttpException(400, 'userEmail is empty');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: email } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const code = Math.floor(100000 + Math.random() * 900000);
    await UsuarioEntity.update(findUser.id, { ...findUser, resetPasswordCode: code });
    const updateUser: Usuario = await UsuarioEntity.findOne({ where: { id: findUser.id } });
    // Send Email

    await sendForgotPasswordEmail(updateUser.login, code);
    return updateUser;
  }

  public async resetPassword(email: string, code: number, newPassword: string): Promise<Usuario> {
    if (isEmpty(email)) throw new HttpException(400, 'userEmail is empty');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: email } });
    if (!findUser) throw new HttpException(409, 'Usuario com esse email não existe');
    if (findUser.resetPasswordCode !== code) throw new HttpException(409, 'Código informado está incorreto');
    const hashedPassword = await hash(newPassword, 10);

    await UsuarioEntity.update(findUser.id, { ...findUser, senha: hashedPassword, resetPasswordCode: null });
    const updateUser: Usuario = await UsuarioEntity.findOne({ where: { id: findUser.id } });
    // Send Email
    return updateUser;
  }

  public async logout(userData: Usuario): Promise<Usuario> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { l: userData.login, password: userData.senha } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: Usuario): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
