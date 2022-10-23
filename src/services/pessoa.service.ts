import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { PessoaEntity } from '@/entities/pessoa.entity';
import { Pessoa } from '@/interfaces/pessoa.interface';
import { PessoaCreateDTO, PessoaUpdateDTO } from '@/dtos/pessoa.dto';

@EntityRepository()
class PessoaService extends Repository<PessoaEntity> {
  public async findAllPerson(): Promise<Pessoa[]> {
    const people: Pessoa[] = await PessoaEntity.find();
    return people;
  }

  public async findPersonById(personId: number): Promise<Pessoa> {
    if (isEmpty(personId)) throw new HttpException(400, 'PersonId está vazio');

    const findPerson: Pessoa = await PessoaEntity.findOne({ where: { id: personId } });
    if (!findPerson) throw new HttpException(409, 'Usuario não existe');

    return findPerson;
  }

  // public async createPerson(personData: PessoaCreateDTO): Promise<Pessoa> {
  //   if (isEmpty(personData)) throw new HttpException(400, 'personData is empty');

  //   const createPersonData: Pessoa = await PessoaEntity.create({ ...personData }).save();

  //   return createPersonData;
  // }

  public async updatePerson(personId: number, personData: PessoaUpdateDTO): Promise<Pessoa> {
    if (isEmpty(personData)) throw new HttpException(400, 'Usuário Data está vazio');

    const findPerson: Pessoa = await PessoaEntity.findOne({ where: { id: personId } });
    if (!findPerson) throw new HttpException(409, 'Responsável não existe');

    await PessoaEntity.update(personId, { ...personData });

    const updatePerson: Pessoa = await PessoaEntity.findOne({ where: { id: personId } });
    return updatePerson;
  }

  public async deletePerson(personId: number): Promise<Pessoa> {
    if (isEmpty(personId)) throw new HttpException(400, 'PersonId está vazio');

    const findPerson: Pessoa = await PessoaEntity.findOne({ where: { id: personId } });
    if (!findPerson) throw new HttpException(409, 'Responsável não existe');

    await PessoaEntity.delete({ id: personId });
    return findPerson;
  }
}

export default PessoaService;
