import { Routes } from '@angular/router';
import { HomePageComponent } from './country/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes'), // Lazy Load
  },
  {
    path: '**',
    redirectTo: '',
  }
];
