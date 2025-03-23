import { CategoriaEmpresaEstatisticasView } from '@/entities/views/categoria-empresa-estatisticas.view.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { getRepository } from 'typeorm';
import { PaginationConfig } from '@/interfaces/utils.interface';

class CategoriaEmpresaCountService {
  public async findAllCategoriaCount(paginationConfig?: PaginationConfig): Promise<{ data: CategoriaEmpresaEstatisticasView[]; count: number }> {
    const categoriaCountRepository = getRepository(CategoriaEmpresaEstatisticasView);

    if (paginationConfig) {
      const [data, count] = await categoriaCountRepository.findAndCount({
        take: paginationConfig.take,
        skip: paginationConfig.skip,
        order: {
          [paginationConfig.orderColumn]: paginationConfig.order,
        },
      });

      return { data, count };
    } else {
      const data = await categoriaCountRepository.find();
      return { data, count: data.length };
    }
  }

  public async findCategoriaCountById(categoriaId: number): Promise<CategoriaEmpresaEstatisticasView> {
    if (isEmpty(categoriaId)) throw new HttpException(400, 'CategoryId is empty');

    const categoriaCountRepository = getRepository(CategoriaEmpresaEstatisticasView);
    const categoriaCount = await categoriaCountRepository.findOne({ where: { id: categoriaId } });
    if (!categoriaCount) throw new HttpException(404, 'Category count not found');

    return categoriaCount;
  }
}

export default CategoriaEmpresaCountService;
