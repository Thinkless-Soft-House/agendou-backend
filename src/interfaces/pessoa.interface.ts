export interface Pessoa {
  id: number;
  nome: string;

  cpfCnpj: number;
  funcao: string;
  municipio: string;
  estado: string;
  pais: string;
  endereco: string;
  numero: number;
  telefone: number;
  cep: number;
  dataNascimento: number;

  foto: string;

  userCreated: number;
  dateCreated: Date;

  userUpdated: number;
  dateUpdated: Date;
}
