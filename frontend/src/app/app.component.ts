import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="topbar">
      <div>
        <h1>MyLibrary</h1>
        <p>Biblioteca pessoal</p>
      </div>
      <nav>
        <a routerLink="/">Dashboard</a>
        <a routerLink="/categorias">Categorias</a>
        <a routerLink="/livros">Livros</a>
        <a routerLink="/emprestimos">Empréstimos</a>
      </nav>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}
