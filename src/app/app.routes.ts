import { Routes } from '@angular/router';
import {RedirigirComponent} from "./redirigir/redirigir.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'redirigir',
    component: RedirigirComponent,
  },

];
