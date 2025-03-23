import { NextFunction, Request, Response } from 'express';
import { CategoriaEmpresaEstatisticasView } from '@/entities/views/categoria-empresa-estatisticas.view.entity';
import CategoriaEmpresaCountService from '@/services/categoria-empresa-count.service';
import { createPaginationConfig } from '@/utils/util';
import { PaginationConfig } from '@/interfaces/utils.interface';

class CategoriaEmpresaCountController {
  public categoriaEmpresaCountService = new CategoriaEmpresaCountService();

  public getCategoriaEmpresaCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paginationConfig: PaginationConfig = createPaginationConfig(req);
      const { data, count } = await this.categoriaEmpresaCountService.findAllCategoriaCount(paginationConfig);

      res.status(200).json({ data, count, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCategoriaEmpresaCountById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoriaId = Number(req.params.id);
      const findOneCategoriaCount: CategoriaEmpresaEstatisticasView = await this.categoriaEmpresaCountService.findCategoriaCountById(categoriaId);

      res.status(200).json({ data: findOneCategoriaCount, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriaEmpresaCountController;
