import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
      .pipe(
        map( restCountries => {
          return CountryMapper.mapRestCountryArrToCountryArr(restCountries);
        }),
        catchError( error => {
          return throwError(() =>  new Error(`No countries recovered which capital contains: ${query}`))
        }),
      );

  }

}
