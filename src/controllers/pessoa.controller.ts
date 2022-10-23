import { NextFunction, Request, Response } from 'express';
import { PessoaCreateDTO, PessoaUpdateDTO } from '@dtos/pessoa.dto';
import { Pessoa } from '@interfaces/pessoa.interface';
import PessoaService from '@/services/pessoa.service';

class PessoaController {
  public pessoaService = new PessoaService();

  public getPerson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPersonData: Pessoa[] = await this.pessoaService.findAllPerson();

      res.status(200).json({ data: findAllPersonData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPersonById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personId = Number(req.params.id);
      const findOnePersonData: Pessoa = await this.pessoaService.findPersonById(personId);

      res.status(200).json({ data: findOnePersonData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  // public createPerson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const personData: PessoaCreateDTO = req.body;
  //     const createPersonData: Pessoa = await this.pessoaService.createPerson(personData);

  //     res.status(201).json({ data: createPersonData, message: 'created' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public updatePerson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personId = Number(req.params.id);
      const personData: PessoaUpdateDTO = req.body;
      const updatePersonData: Pessoa = await this.pessoaService.updatePerson(personId, personData);

      res.status(200).json({ data: updatePersonData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePerson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personId = Number(req.params.id);
      const deletePersonData: Pessoa = await this.pessoaService.deletePerson(personId);

      res.status(200).json({ data: deletePersonData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PessoaController;
