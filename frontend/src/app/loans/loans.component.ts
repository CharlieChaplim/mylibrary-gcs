import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Emprestimo, Livro } from '../models/models';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
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
