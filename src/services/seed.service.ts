import { PermissaoEntity } from '@/entities/permissao.entity';
import { PermissaoEnum } from '@/interfaces/permissao.interface';
import { EmpresaEntity } from '@/entities/empresa.entity';
import { UsuarioEntity } from '@/entities/usuario.entity';
import { PessoaEntity } from '@/entities/pessoa.entity';
import { SalaEntity } from '@/entities/sala.entity';
import { DisponibilidadeEntity } from '@/entities/disponibilidade.entity';
import { StatusEntity } from '@/entities/status.entity';
import { StatusEnum } from '@/interfaces/status.interface';
import { ReservaEntity } from '@/entities/reserva.entity';
import { StatusReservaEntity } from '@/entities/status-reserva.entity';
import { CategoriaEmpresaEntity } from '@/entities/categoria-empresa.entity';
import { HttpException } from '@exceptions/HttpException';

class SeedService {
  public async seed(): Promise<{ message: string }> {
    try {
      const permissoes = await this.seedPermissoes();
      const categoriaEmpresa = await this.seedCategoriasEmpresa();
      const empresa = await this.seedEmpresa(categoriaEmpresa.id);
      const usuarios = await this.seedUsuarios(permissoes, empresa.id);
      const salas = await this.seedSalas(empresa.id);
      const disponibilidades = await this.seedDisponibilidades(salas);
      const status = await this.seedStatus();
      const reservas = await this.seedReservas(salas, usuarios[1].id, status[1].id);

      return { message: 'Banco de dados populado com sucesso!' };
    } catch (error) {
      throw new HttpException(500, `Erro ao popular banco: ${error.message}`);
    }
  }

  private async seedPermissoes(): Promise<PermissaoEntity[]> {
    // Limpa permissões existentes
    await PermissaoEntity.delete({});

    const permissoes = [
      { id: PermissaoEnum.Admin, descricao: 'Administrador' },
      { id: PermissaoEnum.Cliente, descricao: 'Cliente' },
      { id: PermissaoEnum.Empresa, descricao: 'Empresa' },
      { id: PermissaoEnum.Funcionario, descricao: 'Funcionário' },
    ];

    return Promise.all(
      permissoes.map(async perm => {
        const permissao = new PermissaoEntity();
        permissao.id = perm.id;
        permissao.descricao = perm.descricao;
        return permissao.save();
      }),
    );
  }

  private async seedCategoriasEmpresa(): Promise<CategoriaEmpresaEntity> {
    // Limpa categorias existentes
    await CategoriaEmpresaEntity.delete({});

    const categoria = new CategoriaEmpresaEntity();
    categoria.descricao = 'Escritório';
    return categoria.save();
  }

  private async seedEmpresa(categoriaId: number): Promise<EmpresaEntity> {
    // Limpa empresas existentes
    await EmpresaEntity.delete({});

    const empresa = new EmpresaEntity();
    empresa.nome = 'Empresa Teste';
    empresa.telefone = '11999999999';
    empresa.cpfCnpj = 12345678901234;
    empresa.municipio = 'São Paulo';
    empresa.estado = 'SP';
    empresa.pais = 'Brasil';
    empresa.endereco = 'Rua Teste, 123';
    empresa.numeroEndereco = '123';
    empresa.cep = 12345678;
    empresa.categoriaId = categoriaId;
    empresa.userCreated = 1;
    empresa.status = 'active';
    empresa.assinaturaStatus = 'active';
    empresa.disponibilidade = 'active';
    empresa.EMP_PROVIDER = 1;

    return empresa.save();
  }

  private async seedUsuarios(permissoes: PermissaoEntity[], empresaId: number): Promise<UsuarioEntity[]> {
    // Limpa usuários e pessoas existentes
    await UsuarioEntity.delete({});
    await PessoaEntity.delete({});

    const usuarios = [];

    // Admin
    const adminPessoa = new PessoaEntity();
    adminPessoa.nome = 'Admin Teste';
    adminPessoa.cpfCnpj = 12345678901;
    adminPessoa.telefone = 11999999901;
    await adminPessoa.save();

    const adminUser = new UsuarioEntity();
    adminUser.login = 'admin@teste.com';
    adminUser.senha = '$2b$10$OB9KXq6jEk.V2lfZNkNOhejmiCfnU2hd/alYS9empxN5tKNGMUlJO'; // senha: 123456
    adminUser.status = 1;
    adminUser.permissaoId = permissoes[0].id;
    adminUser.pessoaId = adminPessoa.id;
    adminUser.pessoa = adminPessoa;
    usuarios.push(await adminUser.save());

    // Cliente
    const clientePessoa = new PessoaEntity();
    clientePessoa.nome = 'Cliente Teste';
    clientePessoa.cpfCnpj = 12345678902;
    clientePessoa.telefone = 11999999902;
    await clientePessoa.save();

    const clienteUser = new UsuarioEntity();
    clienteUser.login = 'cliente@teste.com';
    clienteUser.senha = '$2b$10$OB9KXq6jEk.V2lfZNkNOhejmiCfnU2hd/alYS9empxN5tKNGMUlJO'; // senha: 123456
    clienteUser.status = 1;
    clienteUser.permissaoId = permissoes[1].id;
    clienteUser.pessoaId = clientePessoa.id;
    clienteUser.pessoa = clientePessoa;
    usuarios.push(await clienteUser.save());

    // Empresa
    const empresaPessoa = new PessoaEntity();
    empresaPessoa.nome = 'Gestor Empresa';
    empresaPessoa.cpfCnpj = 12345678903;
    empresaPessoa.telefone = 11999999903;
    await empresaPessoa.save();

    const empresaUser = new UsuarioEntity();
    empresaUser.login = 'gestor@teste.com';
    empresaUser.senha = '$2b$10$OB9KXq6jEk.V2lfZNkNOhejmiCfnU2hd/alYS9empxN5tKNGMUlJO'; // senha: 123456
    empresaUser.status = 1;
    empresaUser.permissaoId = permissoes[2].id;
    empresaUser.empresaId = empresaId;
    empresaUser.pessoaId = empresaPessoa.id;
    empresaUser.pessoa = empresaPessoa;
    usuarios.push(await empresaUser.save());

    // Funcionário
    const funcionarioPessoa = new PessoaEntity();
    funcionarioPessoa.nome = 'Funcionário Teste';
    funcionarioPessoa.cpfCnpj = 12345678904;
    funcionarioPessoa.telefone = 11999999904;
    await funcionarioPessoa.save();

    const funcionarioUser = new UsuarioEntity();
    funcionarioUser.login = 'funcionario@teste.com';
    funcionarioUser.senha = '$2b$10$OB9KXq6jEk.V2lfZNkNOhejmiCfnU2hd/alYS9empxN5tKNGMUlJO'; // senha: 123456
    funcionarioUser.status = 1;
    funcionarioUser.permissaoId = permissoes[3].id;
    funcionarioUser.empresaId = empresaId;
    funcionarioUser.pessoaId = funcionarioPessoa.id;
    funcionarioUser.pessoa = funcionarioPessoa;
    usuarios.push(await funcionarioUser.save());

    return usuarios;
  }

  private async seedSalas(empresaId: number): Promise<SalaEntity[]> {
    // Limpa salas existentes
    await SalaEntity.delete({});

    const salas = [];

    // Sala 1
    const sala1 = new SalaEntity();
    sala1.nome = 'Sala de Reuniões 1';
    sala1.status = 1;
    sala1.multiplasMarcacoes = true;
    sala1.empresaId = empresaId;
    salas.push(await sala1.save());

    // Sala 2
    const sala2 = new SalaEntity();
    sala2.nome = 'Auditório';
    sala2.status = 1;
    sala2.multiplasMarcacoes = false;
    sala2.empresaId = empresaId;
    salas.push(await sala2.save());

    return salas;
  }

  private async seedDisponibilidades(salas: SalaEntity[]): Promise<DisponibilidadeEntity[]> {
    // Limpa disponibilidades existentes
    await DisponibilidadeEntity.delete({});

    const disponibilidades = [];

    // Dias da semana
    const diasSemana = [
      { index: 0, nome: 'Domingo' },
      { index: 1, nome: 'Segunda' },
      { index: 2, nome: 'Terça' },
      { index: 3, nome: 'Quarta' },
      { index: 4, nome: 'Quinta' },
      { index: 5, nome: 'Sexta' },
      { index: 6, nome: 'Sábado' },
    ];

    // Criar disponibilidades para cada sala e dia da semana
    for (const sala of salas) {
      for (const dia of diasSemana) {
        // Dias úteis - horário comercial
        if (dia.index >= 1 && dia.index <= 5) {
          const disp = new DisponibilidadeEntity();
          disp.ativo = true;
          disp.hrAbertura = '08:00';
          disp.hrFim = '18:00';
          disp.diaSemana = dia.nome;
          disp.diaSemanaIndex = dia.index;
          disp.minDiasCan = 1;
          disp.intervaloMinutos = 30;
          disp.salaId = sala.id;
          disponibilidades.push(await disp.save());
        }
        // Fins de semana - fechado
        else {
          const disp = new DisponibilidadeEntity();
          disp.ativo = false;
          disp.hrAbertura = '00:00';
          disp.hrFim = '00:00';
          disp.diaSemana = dia.nome;
          disp.diaSemanaIndex = dia.index;
          disp.minDiasCan = 1;
          disp.intervaloMinutos = 30;
          disp.salaId = sala.id;
          disponibilidades.push(await disp.save());
        }
      }
    }

    return disponibilidades;
  }

  private async seedStatus(): Promise<StatusEntity[]> {
    // Limpa status existentes
    await StatusEntity.delete({});

    const status = [];

    // Criar um registro para cada enum de status
    for (let i = 1; i <= 5; i++) {
      const statusItem = new StatusEntity();
      statusItem.id = i;
      statusItem.tipo = i as StatusEnum;
      status.push(await statusItem.save());
    }

    return status;
  }

  private async seedReservas(salas: SalaEntity[], usuarioId: number, statusId: number): Promise<ReservaEntity[]> {
    // Limpa reservas e status de reservas existentes
    await StatusReservaEntity.delete({});
    await ReservaEntity.delete({});

    const reservas = [];

    // Data atual
    const hoje = new Date();
    const amanha = new Date();
    amanha.setDate(hoje.getDate() + 1);
    const proxSemana = new Date();
    proxSemana.setDate(hoje.getDate() + 7);

    // Reserva para hoje
    const reservaHoje = new ReservaEntity();
    reservaHoje.date = hoje;
    reservaHoje.horaInicio = '10:00';
    reservaHoje.horaFim = '11:00';
    reservaHoje.observacao = 'Reunião de planejamento';
    reservaHoje.diaSemanaIndex = hoje.getDay();
    reservaHoje.salaId = salas[0].id;
    reservaHoje.usuarioId = usuarioId;
    const reservaHojeSalva = await reservaHoje.save();

    // Status para reserva de hoje
    const statusReservaHoje = new StatusReservaEntity();
    statusReservaHoje.reservaId = reservaHojeSalva.id;
    statusReservaHoje.statusId = statusId;
    await statusReservaHoje.save();

    reservas.push(reservaHojeSalva);

    // Reserva para amanhã
    const reservaAmanha = new ReservaEntity();
    reservaAmanha.date = amanha;
    reservaAmanha.horaInicio = '14:00';
    reservaAmanha.horaFim = '16:00';
    reservaAmanha.observacao = 'Apresentação de projeto';
    reservaAmanha.diaSemanaIndex = amanha.getDay();
    reservaAmanha.salaId = salas[1].id;
    reservaAmanha.usuarioId = usuarioId;
    const reservaAmanhaSalva = await reservaAmanha.save();

    // Status para reserva de amanhã
    const statusReservaAmanha = new StatusReservaEntity();
    statusReservaAmanha.reservaId = reservaAmanhaSalva.id;
    statusReservaAmanha.statusId = statusId;
    await statusReservaAmanha.save();

    reservas.push(reservaAmanhaSalva);

    // Reserva para próxima semana
    const reservaSemana = new ReservaEntity();
    reservaSemana.date = proxSemana;
    reservaSemana.horaInicio = '09:00';
    reservaSemana.horaFim = '10:30';
    reservaSemana.observacao = 'Treinamento de equipe';
    reservaSemana.diaSemanaIndex = proxSemana.getDay();
    reservaSemana.salaId = salas[0].id;
    reservaSemana.usuarioId = usuarioId;
    const reservaSemanaSalva = await reservaSemana.save();

    // Status para reserva da próxima semana
    const statusReservaSemana = new StatusReservaEntity();
    statusReservaSemana.reservaId = reservaSemanaSalva.id;
    statusReservaSemana.statusId = statusId;
    await statusReservaSemana.save();

    reservas.push(reservaSemanaSalva);

    return reservas;
  }
}

export default SeedService;
