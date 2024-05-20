import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import DisponibilidadeRoute from './routes/disponibilidade.route';
import EmpresaRoute from './routes/empresa.route';
import PermissaoRoute from './routes/permissao.route';
import ReservaRoute from './routes/reserva.route';
import ResponsavelRoute from './routes/responsavel.route';
import SalaRoute from './routes/sala.route';
import StatusReservaRoute from './routes/status-reserva.route';
import StatusRoute from './routes/status.route';
import UsuarioRoute from './routes/usuario.route';
import CategoriaEmpresaRoute from './routes/categoria-empresa.route';
import PessoaRoute from './routes/pessoa.route';

// validateEnv();

const app = new App([
  new IndexRoute(),
  new SalaRoute(),
  new AuthRoute(),
  new UsuarioRoute(),
  new EmpresaRoute(),
  new PermissaoRoute(),
  new DisponibilidadeRoute(),
  new ReservaRoute(),
  new ResponsavelRoute(),
  new StatusReservaRoute(),
  new StatusRoute(),
  new CategoriaEmpresaRoute(),
  new PessoaRoute(),
]);

app.listen();
