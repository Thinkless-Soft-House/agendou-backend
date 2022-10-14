import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { PermissaoEntity } from '@/entities/permissao.entity';
import { Permissao } from '@/interfaces/permissao.interface';
import { PermissaoCreateDTO, PermissaoUpdateDTO } from '@/dtos/permissao.dto';

@EntityRepository()
class PermissaoService extends Repository<PermissaoEntity> {
  public async findAllPermission(): Promise<Permissao[]> {
    const permissions: Permissao[] = await PermissaoEntity.find();
    return permissions;
  }

  public async findPermissionById(permissionId: number): Promise<Permissao> {
    if (isEmpty(permissionId)) throw new HttpException(400, 'PermissionId está vazio');

    const findPermission: Permissao = await PermissaoEntity.findOne({ where: { id: permissionId } });
    if (!findPermission) throw new HttpException(409, 'Usuario não existe');

    return findPermission;
  }

  public async createPermission(permissionData: PermissaoCreateDTO): Promise<Permissao> {
    if (isEmpty(permissionData)) throw new HttpException(400, 'permissionData is empty');

    const createPermissionData: Permissao = await PermissaoEntity.create({ ...permissionData }).save();

    return createPermissionData;
  }

  public async updatePermission(permissionId: number, permissionData: PermissaoUpdateDTO): Promise<Permissao> {
    if (isEmpty(permissionData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findPermission: Permissao = await PermissaoEntity.findOne({ where: { id: permissionId } });
    if (!findPermission) throw new HttpException(409, 'Usuário não existe');

    await PermissaoEntity.update(permissionId, { ...permissionData });

    const updatePermission: Permissao = await PermissaoEntity.findOne({ where: { id: permissionId } });
    return updatePermission;
  }

  public async deletePermission(permissionId: number): Promise<Permissao> {
    if (isEmpty(permissionId)) throw new HttpException(400, 'PermissionId está vazio');

    const findPermission: Permissao = await PermissaoEntity.findOne({ where: { id: permissionId } });
    if (!findPermission) throw new HttpException(409, 'Usuário não existe');

    await PermissaoEntity.delete({ id: permissionId });
    return findPermission;
  }
}

export default PermissaoService;
