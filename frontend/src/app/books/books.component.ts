import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Categoria, Emprestimo, Livro, StatusLivro } from '../models/models';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="page">
      <h2>Livros</h2>
      <form [formGroup]="form" (ngSubmit)="salvar()" class="form-grid">
        <input formControlName="titulo" placeholder="Título">
        <input formControlName="autor" placeholder="Autor">
        <input formControlName="isbn" placeholder="ISBN">
        <input formControlName="ano" type="number" placeholder="Ano">
        <select formControlName="categoriaId">
          <option [ngValue]="null">Categoria</option>
          <option *ngFor="let c of categorias" [ngValue]="c.id">{{ c.nome }}</option>
        </select>
        <button type="submit" [disabled]="form.invalid">Cadastrar livro</button>
      </form>
      <p class="erro" *ngIf="erro">{{ erro }}</p>

      <h3>Filtros</h3>
      <form [formGroup]="filtros" class="form-row">
        <input formControlName="busca" placeholder="Buscar por título ou autor" (input)="carregarLivros()">
        <select formControlName="categoriaId" (change)="carregarLivros()">
          <option [ngValue]="null">Todas as categorias</option>
          <option *ngFor="let c of categorias" [ngValue]="c.id">{{ c.nome }}</option>
        </select>
        <select formControlName="status" (change)="carregarLivros()">
          <option value="">Todos</option>
          <option value="DISPONIVEL">Disponível</option>
          <option value="EMPRESTADO">Emprestado</option>
        </select>
      </form>

      <table>
        <thead><tr><th>Título</th><th>Autor</th><th>Categoria</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          <tr *ngFor="let l of livros">
            <td>{{ l.titulo }}</td><td>{{ l.autor }}</td><td>{{ l.categoriaNome }}</td><td><span class="tag">{{ l.status }}</span></td>
            <td class="actions">
              <button (click)="verHistorico(l.id)">Histórico</button>
              <button class="danger" (click)="excluir(l.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <section class="panel" *ngIf="historico.length">
        <h3>Histórico do livro</h3>
        <table>
          <thead><tr><th>Pessoa</th><th>Emprestado</th><th>Previsto</th><th>Devolvido</th></tr></thead>
          <tbody>
            <tr *ngFor="let h of historico">
              <td>{{ h.nomePessoa }}</td><td>{{ h.dataEmprestimo }}</td><td>{{ h.dataDevolucaoPrevista }}</td><td>{{ h.dataDevolucaoEfetiva || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  `
})
export class BooksComponent implements OnInit {
  categorias: Categoria[] = [];
  livros: Livro[] = [];
  historico: Emprestimo[] = [];
  erro = '';

  form = this.fb.group({
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    isbn: [''],
    ano: [null as number | null],
    categoriaId: [null as number | null, Validators.required]
  });

  filtros = this.fb.group({
    busca: [''],
    categoriaId: [null as number | null],
    status: ['' as StatusLivro | '']
  });

  constructor(private fb: FormBuilder, private api: ApiService) {}
  ngOnInit(): void { this.carregarCategorias(); this.carregarLivros(); }
  carregarCategorias(): void { this.api.listarCategorias().subscribe(c => this.categorias = c); }
  carregarLivros(): void { this.api.listarLivros(this.filtros.getRawValue()).subscribe(l => this.livros = l); }
  salvar(): void {
    if (this.form.invalid) return;
    this.erro = '';
    const raw = this.form.getRawValue();
    this.api.criarLivro({
      titulo: raw.titulo!, autor: raw.autor!, isbn: raw.isbn ?? undefined,
      ano: raw.ano ?? undefined, categoriaId: raw.categoriaId!
    }).subscribe({
      next: () => { this.form.reset(); this.carregarLivros(); this.carregarCategorias(); },
      error: err => this.erro = err.error?.message ?? 'Erro ao salvar livro.'
    });
  }
  excluir(id: number): void {
    this.erro = '';
    this.api.excluirLivro(id).subscribe({
      next: () => { this.carregarLivros(); this.carregarCategorias(); },
      error: err => this.erro = err.error?.message ?? 'Erro ao excluir livro.'
    });
  }
  verHistorico(id: number): void { this.api.historicoLivro(id).subscribe(h => this.historico = h); }
}
