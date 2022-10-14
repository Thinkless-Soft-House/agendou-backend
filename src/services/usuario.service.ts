import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { UsuarioEntity } from '@/entities/usuario.entity';
import { Usuario } from '@/interfaces/usuario.interface';
import { UsuarioCreateDTO, UsuarioUpdateDTO } from '@/dtos/usuario.dto';

@EntityRepository()
class UsuarioService extends Repository<UsuarioEntity> {
  public async findAllUser(): Promise<Usuario[]> {
    const users: Usuario[] = await UsuarioEntity.find();
    return users;
  }

  public async findUserById(userId: number): Promise<Usuario> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId está vazio');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'Usuario não existe');

    return findUser;
  }

  public async createUser(userData: UsuarioCreateDTO): Promise<Usuario> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: userData.login } });
    if (findUser) throw new HttpException(409, `O Login ${userData.login} já existe`);

    const hashedPassword = await hash(userData.senha, 10);
    console.log('user', userData);

    const createUserData: Usuario = await UsuarioEntity.create({ ...userData, senha: hashedPassword }).save();

    return createUserData;
  }

  public async updateUser(userId: number, userData: UsuarioUpdateDTO): Promise<Usuario> {
    if (isEmpty(userData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'Usuário não existe');

    const hashedPassword = await hash(userData.senha, 10);
    await UsuarioEntity.update(userId, { ...userData, senha: hashedPassword });

    const updateUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<Usuario> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId está vazio');

    const findUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'Usuário não existe');

    await UsuarioEntity.delete({ id: userId });
    return findUser;
  }
}

export default UsuarioService;
