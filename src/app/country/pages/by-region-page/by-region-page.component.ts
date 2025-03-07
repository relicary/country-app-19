import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countryService  = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region | null> (null);

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  countryResource = rxResource({
    request: () => ({ selectedRegion: this.selectedRegion() }),
    loader: ({ request }) => {
      console.log(request.selectedRegion);
      if ( !request.selectedRegion ) return of([]);

      return this.countryService.searchByRegion(request.selectedRegion);
    }
  });


}
