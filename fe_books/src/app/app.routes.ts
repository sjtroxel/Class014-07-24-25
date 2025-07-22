import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { noAuthGuard } from './no-auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./book-list/book-list').then((c) => c.BookListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then((c) => c.LoginComponent),
	canActivate: [noAuthGuard],
  },
];
