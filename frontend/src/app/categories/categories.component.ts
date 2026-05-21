import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Categoria } from '../models/models';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="page">
      <h2>Categorias</h2>
      <form [formGroup]="form" (ngSubmit)="salvar()" class="form-row">
        <input formControlName="nome" placeholder="Nome da categoria">
        <input formControlName="descricao" placeholder="Descrição">
        <button type="submit" [disabled]="form.invalid">Adicionar</button>
      </form>
      <p class="erro" *ngIf="erro">{{ erro }}</p>

      <table>
        <thead><tr><th>Nome</th><th>Descrição</th><th>Livros</th><th>Ações</th></tr></thead>
        <tbody>
          <tr *ngFor="let c of categorias">
            <td>{{ c.nome }}</td><td>{{ c.descricao }}</td><td>{{ c.totalLivros }}</td>
            <td><button class="danger" (click)="excluir(c.id)">Excluir</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  `
})
export class CategoriesComponent implements OnInit {
  categorias: Categoria[] = [];
  erro = '';
  form = this.fb.nonNullable.group({ nome: ['', Validators.required], descricao: [''] });

  constructor(private fb: FormBuilder, private api: ApiService) {}
  ngOnInit(): void { this.carregar(); }
  carregar(): void { this.api.listarCategorias().subscribe(c => this.categorias = c); }
  salvar(): void {
    if (this.form.invalid) return;
    this.erro = '';
    this.api.criarCategoria(this.form.getRawValue()).subscribe({
      next: () => { this.form.reset(); this.carregar(); },
      error: err => this.erro = err.error?.message ?? 'Erro ao salvar categoria.'
    });
  }
  excluir(id: number): void {
    this.erro = '';
    this.api.excluirCategoria(id).subscribe({
      next: () => this.carregar(),
      error: err => this.erro = err.error?.message ?? 'Erro ao excluir categoria.'
    });
  }
}
