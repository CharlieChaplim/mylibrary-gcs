import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { BooksComponent } from './books/books.component';
import { LoansComponent } from './loans/loans.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'categorias', component: CategoriesComponent },
  { path: 'livros', component: BooksComponent },
  { path: 'emprestimos', component: LoansComponent },
  { path: '**', redirectTo: '' }
];
