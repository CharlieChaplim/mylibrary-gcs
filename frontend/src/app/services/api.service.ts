import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, Dashboard, Emprestimo, Livro, StatusLivro } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`);
  }

  criarCategoria(payload: { nome: string; descricao?: string }): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseUrl}/categorias`, payload);
  }

  excluirCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categorias/${id}`);
  }

  listarLivros(filtros: { categoriaId?: number | null; status?: StatusLivro | '' | null; busca?: string | null }): Observable<Livro[]> {
    let params = new HttpParams();
    if (filtros.categoriaId) params = params.set('categoriaId', filtros.categoriaId);
    if (filtros.status) params = params.set('status', filtros.status);
    if (filtros.busca) params = params.set('busca', filtros.busca);
    return this.http.get<Livro[]>(`${this.baseUrl}/livros`, { params });
  }

  criarLivro(payload: { titulo: string; autor: string; isbn?: string; ano?: number; categoriaId: number }): Observable<Livro> {
    return this.http.post<Livro>(`${this.baseUrl}/livros`, payload);
  }

  excluirLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/livros/${id}`);
  }

  historicoLivro(id: number): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.baseUrl}/livros/${id}/emprestimos`);
  }

  listarEmprestimos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.baseUrl}/emprestimos`);
  }

  listarAtivos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.baseUrl}/emprestimos/ativos`);
  }

  listarAtrasados(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.baseUrl}/emprestimos/atrasados`);
  }

  emprestar(payload: { livroId: number; nomePessoa: string; telefone?: string; dataDevolucaoPrevista: string }): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.baseUrl}/emprestimos/emprestar`, payload);
  }

  devolver(id: number): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.baseUrl}/emprestimos/${id}/devolver`, {});
  }

  dashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.baseUrl}/dashboard`);
  }
}
