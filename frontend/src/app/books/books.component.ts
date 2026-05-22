import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Categoria, Emprestimo, Livro, StatusLivro } from '../models/models';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
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
