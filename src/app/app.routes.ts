import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/symax-home/symax-home.component').then(m => m.SymaxHomeComponent) },
  { path: 'racing', component: HomeComponent },
  { path: 'phoenix', loadComponent: () => import('./pages/phoenix/phoenix.component').then(m => m.PhoenixComponent) },
  { path: 'portfolio/:id', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
