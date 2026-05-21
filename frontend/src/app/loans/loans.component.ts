import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Emprestimo, Livro } from '../models/models';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="page">
      <h2>Empréstimos</h2>
      <form [formGroup]="form" (ngSubmit)="emprestar()" class="form-grid">
        <select formControlName="livroId">
          <option [ngValue]="null">Livro disponível</option>
          <option *ngFor="let l of livrosDisponiveis" [ngValue]="l.id">{{ l.titulo }} — {{ l.autor }}</option>
        </select>
        <input formControlName="nomePessoa" placeholder="Nome da pessoa">
        <input formControlName="telefone" placeholder="Telefone">
        <input formControlName="dataDevolucaoPrevista" type="date">
        <button type="submit" [disabled]="form.invalid">Emprestar</button>
      </form>
      <p class="erro" *ngIf="erro">{{ erro }}</p>

      <h3>Empréstimos ativos</h3>
      <table>
        <thead><tr><th>Livro</th><th>Pessoa</th><th>Previsto</th><th>Atraso</th><th>Ações</th></tr></thead>
        <tbody>
          <tr *ngFor="let e of ativos">
            <td>{{ e.livroTitulo }}</td><td>{{ e.nomePessoa }}</td><td>{{ e.dataDevolucaoPrevista }}</td>
            <td>{{ e.atrasado ? e.diasAtraso + ' dia(s)' : '-' }}</td>
            <td><button (click)="devolver(e.id)">Devolver</button></td>
          </tr>
        </tbody>
      </table>

      <h3>Relatório de atrasados</h3>
      <table>
        <thead><tr><th>Livro</th><th>Pessoa</th><th>Data prevista</th><th>Dias de atraso</th></tr></thead>
        <tbody>
          <tr *ngFor="let e of atrasados">
            <td>{{ e.livroTitulo }}</td><td>{{ e.nomePessoa }}</td><td>{{ e.dataDevolucaoPrevista }}</td><td>{{ e.diasAtraso }}</td>
          </tr>
          <tr *ngIf="!atrasados.length"><td colspan="4">Nenhum empréstimo atrasado.</td></tr>
        </tbody>
      </table>
    </section>
  `
})
export class LoansComponent implements OnInit {
  livrosDisponiveis: Livro[] = [];
  ativos: Emprestimo[] = [];
  atrasados: Emprestimo[] = [];
  erro = '';
  form = this.fb.group({
    livroId: [null as number | null, Validators.required],
    nomePessoa: ['', Validators.required],
    telefone: [''],
    dataDevolucaoPrevista: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private api: ApiService) {}
  ngOnInit(): void { this.carregar(); }
  carregar(): void {
    this.api.listarLivros({ status: 'DISPONIVEL' }).subscribe(l => this.livrosDisponiveis = l);
    this.api.listarAtivos().subscribe(e => this.ativos = e);
    this.api.listarAtrasados().subscribe(e => this.atrasados = e);
  }
  emprestar(): void {
    if (this.form.invalid) return;
    this.erro = '';
    const raw = this.form.getRawValue();
    this.api.emprestar({
      livroId: raw.livroId!, nomePessoa: raw.nomePessoa!, telefone: raw.telefone ?? undefined,
      dataDevolucaoPrevista: raw.dataDevolucaoPrevista!
    }).subscribe({
      next: () => { this.form.reset(); this.carregar(); },
      error: err => this.erro = err.error?.message ?? 'Erro ao registrar empréstimo.'
    });
  }
  devolver(id: number): void {
    this.erro = '';
    this.api.devolver(id).subscribe({
      next: () => this.carregar(),
      error: err => this.erro = err.error?.message ?? 'Erro ao devolver livro.'
    });
  }
}
