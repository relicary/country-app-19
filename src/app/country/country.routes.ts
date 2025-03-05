import { Routes } from '@angular/router';
import { CountryLayoutPageComponent } from './layouts/country-layout-page/country-layout-page.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutPageComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent
      },
      {
        path: 'by-region',
        component: ByRegionPageComponent
      },
      {
        path: 'by/:code',
        component: CountryPageComponent
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
]

export default countryRoutes;
