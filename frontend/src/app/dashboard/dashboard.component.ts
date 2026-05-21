import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Dashboard } from '../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page">
      <h2>Dashboard</h2>
      <div class="grid" *ngIf="dashboard">
        <article class="card"><strong>{{ dashboard.totalLivros }}</strong><span>Total de livros</span></article>
        <article class="card"><strong>{{ dashboard.totalDisponiveis }}</strong><span>Disponíveis</span></article>
        <article class="card"><strong>{{ dashboard.totalEmprestados }}</strong><span>Emprestados</span></article>
        <article class="card"><strong>{{ dashboard.totalEmprestimosAtivos }}</strong><span>Empréstimos ativos</span></article>
      </div>

      <h3>5 últimos empréstimos</h3>
      <table>
        <thead><tr><th>Livro</th><th>Pessoa</th><th>Emprestado em</th><th>Previsto</th></tr></thead>
        <tbody>
          <tr *ngFor="let e of dashboard?.ultimosEmprestimos">
            <td>{{ e.livroTitulo }}</td><td>{{ e.nomePessoa }}</td><td>{{ e.dataEmprestimo }}</td><td>{{ e.dataDevolucaoPrevista }}</td>
          </tr>
          <tr *ngIf="!dashboard?.ultimosEmprestimos?.length"><td colspan="4">Nenhum empréstimo registrado.</td></tr>
        </tbody>
      </table>
    </section>
  `
})
export class DashboardComponent implements OnInit {
  dashboard?: Dashboard;
  constructor(private api: ApiService) {}
  ngOnInit(): void { this.carregar(); }
  carregar(): void { this.api.dashboard().subscribe(d => this.dashboard = d); }
}
