import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=>import('./lead-form/lead-form.component')
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component')
  },
  {
    path: 'filter',
    loadComponent: ()=>import('./filter-leads/filter-leads.component'),
    canActivate: [authGuard]
  }
];
