import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=>import('./lead-form/lead-form.component')
  },
  {
    path: 'filter',
    loadComponent: ()=>import('./filter-leads/filter-leads.component')
  }
];
