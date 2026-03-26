import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'phoenix', loadComponent: () => import('./pages/phoenix/phoenix.component').then(m => m.PhoenixComponent) },
  { path: 'portfolio/:id', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: '**', redirectTo: '' },
];
