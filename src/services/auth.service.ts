import { sign, verify } from 'jsonwebtoken';
import { EntityRepository, Repository } from 'typeorm';
import { SECRET_KEY } from '@config';
import { UsuarioCreateDTO, UsuarioLoginDTO } from '@dtos/usuario.dto';
import { UsuarioEntity } from '@entities/usuario.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Usuario } from '@interfaces/usuario.interface';
import { comparePassword, isEmpty, setPassword } from '@utils/util';
import { sendForgotPasswordEmail } from '@/utils/sendEmail';

@EntityRepository()
class AuthService extends Repository<UsuarioEntity> {
  public async signup(userData: UsuarioCreateDTO): Promise<Usuario> {
    if (isEmpty(userData)) throw new HttpException(400, 'Sem dados para login');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: userData.login } });
    if (findUser) throw new HttpException(409, `O email ${userData.login} já existe`);

    // const hashedPassword = await hash(userData.senha, 10);
    const hashedPassword = setPassword(userData.senha);
    const createUserData: Usuario = await UsuarioEntity.create({ ...userData, senha: hashedPassword }).save();
    return createUserData;
  }

  public async login(userData: UsuarioLoginDTO): Promise<{ cookie: string; findUser: Usuario }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Sem dados para login');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: userData.login } });
    if (!findUser) throw new HttpException(409, `O email ${userData.login} não foi encontrado`);

    // const isPasswordMatching: boolean = await compare(userData.senha, findUser.senha);
    const isPasswordMatching: boolean = comparePassword(userData.senha, findUser.senha);
    if (!isPasswordMatching) throw new HttpException(409, 'Senha incorreta');

    const tokenData = this.createToken(findUser);
    console.log('tokenData', tokenData);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async loginWithKey(userData: { login: string; key: string }): Promise<{ cookie: string; findUser: Usuario }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Sem dados para login');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: userData.login } });
    if (!findUser) throw new HttpException(409, `O email ${userData.login} não foi encontrado`);

    // const isPasswordMatching: boolean = await compare(userData.senha, findUser.senha);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async forgotPassword(email: string): Promise<Usuario> {
    if (isEmpty(email)) throw new HttpException(400, 'Sem dados para login');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: email } });
    if (!findUser) throw new HttpException(409, 'Usuário com esse email não existe');

    const code = Math.floor(100000 + Math.random() * 900000);
    await UsuarioEntity.update(findUser.id, { ...findUser, resetPasswordCode: code });
    const updateUser: Usuario = await UsuarioEntity.findOne({ where: { id: findUser.id } });
    // Send Email

    await sendForgotPasswordEmail(updateUser.login, code);
    return updateUser;
  }

  public async resetPassword(email: string, code: number, newPassword: string): Promise<Usuario> {
    if (isEmpty(email)) throw new HttpException(400, 'Sem dados para login');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: email } });
    if (!findUser) throw new HttpException(409, 'Usuario com esse email não existe');
    if (findUser.resetPasswordCode !== code) throw new HttpException(409, 'Código informado está incorreto');
    // const hashedPassword = await hash(newPassword, 10);
    const hashedPassword = setPassword(newPassword);

    await UsuarioEntity.update(findUser.id, { ...findUser, senha: hashedPassword, resetPasswordCode: null });
    const updateUser: Usuario = await UsuarioEntity.findOne({ where: { id: findUser.id } });
    // Send Email
    return updateUser;
  }

  public async logout(userData: Usuario): Promise<Usuario> {
    if (isEmpty(userData)) throw new HttpException(400, 'Sem dados');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { l: userData.login, password: userData.senha } });
    if (!findUser) throw new HttpException(409, 'Usuário com esse email não existe');

    return findUser;
  }

  public createToken(user: Usuario): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn = '7 days';

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `${tokenData.token}`;
  }

  public async verifyToken(token: string): Promise<boolean> {
    try {
      const secretKey: string = SECRET_KEY;
      const { id } = (await verify(token, secretKey)) as DataStoredInToken;
      const findUser = await UsuarioEntity.findOne(id, { select: ['id', 'login', 'senha'] });

      if (findUser) {
        return true;
      } else {
        throw '';
      }
    } catch (error) {
      return false;
    }
  }
}

export default AuthService;
