import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Categoria } from '../models/models';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
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
