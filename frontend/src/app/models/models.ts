export type StatusLivro = 'DISPONIVEL' | 'EMPRESTADO';

export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
  totalLivros: number;
}

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  isbn?: string;
  ano?: number;
  status: StatusLivro;
  categoriaId: number;
  categoriaNome: string;
}

export interface Emprestimo {
  id: number;
  livroId: number;
  livroTitulo: string;
  nomePessoa: string;
  telefone?: string;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoEfetiva?: string;
  atrasado: boolean;
  diasAtraso: number;
}

export interface Dashboard {
  totalLivros: number;
  totalDisponiveis: number;
  totalEmprestados: number;
  totalEmprestimosAtivos: number;
  ultimosEmprestimos: Emprestimo[];
}
