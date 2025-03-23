import { EmpresaEntity } from '@/entities/empresa.entity';

export interface CategoriaEmpresa {
  id: number;
  descricao: string;
  prefixParticao: string;

  empresas: EmpresaEntity[];
}
