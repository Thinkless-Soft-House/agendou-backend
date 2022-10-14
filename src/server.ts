import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import EmpresaRoute from './routes/empresa.route';
import PermissaoRoute from './routes/permissao.route';
import UsuarioRoute from './routes/usuario.route';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new UsuarioRoute(), new EmpresaRoute(), new PermissaoRoute()]);

app.listen();
