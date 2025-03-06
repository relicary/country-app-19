import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryService = inject(CountryService)

  countryCode = inject(ActivatedRoute)
    .snapshot
    .paramMap.get('code')!;

  countryResource = rxResource({
    request: () => ({ code: this.countryCode}),
    loader: ({request}) => {
      return this.countryService.searchCountryByAlphaCode(request.code)
    }
  });
}
