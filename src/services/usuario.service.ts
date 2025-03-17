import { hash } from 'bcrypt';
import { EntityRepository, Like, Repository, getManager } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty, setPassword } from '@utils/util';
import { UsuarioEntity } from '@/entities/usuario.entity';
import { Usuario } from '@/interfaces/usuario.interface';
import { UsuarioCreateDTO, UsuarioUpdateDTO } from '@/dtos/usuario.dto';
import { PaginationConfig } from '@/interfaces/utils.interface';
import { PessoaEntity } from '@/entities/pessoa.entity';
import { ResponsavelEntity } from '@/entities/responsavel.entity';
import { ReservaEntity } from '@/entities/reserva.entity';
import * as generator from 'generate-password';
import { sendPasswordNewUser } from '@/utils/sendEmail';

@EntityRepository()
class UsuarioService extends Repository<UsuarioEntity> {
  public async findAllUser(): Promise<Usuario[]> {
    const users: Usuario[] = await UsuarioEntity.find();
    return users;
  }

  public async findUserById(userId: number): Promise<Usuario> {
    if (isEmpty(userId)) throw new HttpException(400, 'O ID do usuário está vazio');
    const findUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'Usuário não encontrado');
    return findUser;
  }

  public async findUserByCompany(
    companyId: number,
    paginationConfig: PaginationConfig,
  ): Promise<{
    data: Usuario[];
    total: number;
  }> {
    if (isEmpty(companyId)) throw new HttpException(400, 'O ID da empresa está vazio');
    const order = {};
    order[paginationConfig.orderColumn] = paginationConfig.order;
    const [results, total]: [Usuario[], number] = await UsuarioEntity.findAndCount({
      where: { empresaId: companyId },
      order,
      take: paginationConfig.take,
      skip: paginationConfig.skip,
    });
    return {
      data: results,
      total,
    };
  }

  public async findUserByPermission(
    permissionId: number,
    paginationConfig: PaginationConfig,
  ): Promise<{
    data: Usuario[];
    total: number;
  }> {
    if (isEmpty(permissionId)) throw new HttpException(400, 'O ID da permissão está vazio');
    const order = {};
    order[paginationConfig.orderColumn] = paginationConfig.order;
    const [results, total]: [Usuario[], number] = await UsuarioEntity.findAndCount({
      where: { permissaoId: permissionId },
      order,
      take: paginationConfig.take,
      skip: paginationConfig.skip,
    });
    return {
      data: results,
      total,
    };
  }

  public async findUserByFilter(paginationConfig: PaginationConfig, nomeUsuario: string, email: string, empresaId: number, permissaoId: number) {
    const order = {};
    order[paginationConfig.orderColumn] = paginationConfig.order;
    const where = {};
    if (nomeUsuario !== null) where['nome'] = Like('%' + nomeUsuario + '%');
    if (email !== null) where['login'] = Like('%' + email + '%');
    if (empresaId !== null) where['empresaId'] = empresaId;
    if (permissaoId !== null) where['permissaoId'] = permissaoId;

    const [results, total]: [Usuario[], number] = await UsuarioEntity.findAndCount({
      where,
      take: paginationConfig.take,
      skip: paginationConfig.skip,
      order,
    });
    return {
      data: results,
      total,
    };
  }

  public async createUser(userData: UsuarioCreateDTO): Promise<Usuario> {
    if (isEmpty(userData)) throw new HttpException(400, 'Os dados do usuário estão vazios');
    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: userData.login } });
    if (findUser) throw new HttpException(409, `O Login ${userData.login} já existe`);

    const hashedPassword = setPassword(userData.senha);
    const createUserData: Usuario = await UsuarioEntity.create({ ...userData, senha: hashedPassword }).save();
    return createUserData;
  }

  public async createUserWithoutPassword(userData: UsuarioCreateDTO): Promise<Usuario> {
    if (isEmpty(userData)) throw new HttpException(400, 'Os dados do usuário estão vazios');
    const findUser: Usuario = await UsuarioEntity.findOne({ where: { login: userData.login } });
    if (findUser) throw new HttpException(409, `O Login ${userData.login} já existe`);

    const newPassword = generator.generate({
          length: 12,
          numbers: true,
          symbols: true,
          uppercase: true,
          strict: true
        });
      
        try {    
          const hashedPassword = setPassword(newPassword);
          const createUserData: Usuario = await UsuarioEntity.create({ ...userData, senha: hashedPassword }).save();
          await sendPasswordNewUser(userData.login, newPassword);
          return createUserData;
        } catch (error) {
          console.error("Rollback: Erro no fluxo de senha -", error.message);
          throw new HttpException(500, 'Erro no processo de criação de usuário');
        }
  }

  public async updatePushNotificationToken(userId: number, token: string): Promise<Usuario> {
    if (isEmpty(userId)) throw new HttpException(400, 'O ID do usuário está vazio');
    const findUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'Usuário não encontrado');

    await UsuarioEntity.update(userId, { ...findUser, pushToken: token });
    const updateUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async updateUser(userId: number, userData: UsuarioUpdateDTO): Promise<Usuario> {
    if (isEmpty(userData)) throw new HttpException(400, 'Os dados do usuário estão vazios');
    const findUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'Usuário não encontrado');

    await UsuarioEntity.update(userId, { ...userData, empresaId: userData.empresaId === 0 ? null : userData.empresaId });
    const updateUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<Usuario> {
    if (isEmpty(userId)) throw new HttpException(400, 'O ID do usuário está vazio');
    const findUser: Usuario = await UsuarioEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'Usuário não encontrado');

    const manager = getManager();
    await manager.transaction(async transactionManager => {
      // Deletar Pessoa
      await transactionManager.delete(PessoaEntity, { id: findUser.pessoaId });
      // Deletar Responsável
      await transactionManager.delete(ResponsavelEntity, { usuarioId: userId });
      // Deletar Reservas
      await transactionManager.delete(ReservaEntity, { usuarioId: userId });
      // Deletar Usuário
      await transactionManager.delete(UsuarioEntity, userId);
    });

    return findUser;
  }
}

export default UsuarioService;
