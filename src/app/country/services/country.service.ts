import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { catchError, map, Observable, of, throwError } from 'rxjs';
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
    console.log(`Emiting value ${query}`);

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

  searchByCountry( query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
      .pipe(
        map(restCountries => {
          return CountryMapper.mapRestCountryArrToCountryArr(restCountries);
        }),
        catchError(error => {
          return throwError(() => new Error(`No countries recovered which name contains: ${query}`))
        })
      );
  }

  searchCountryByAlphaCode( code: string): Observable<Country | undefined> {

    return this.http.get<RESTCountry[]>(`${ API_URL }/alpha/${ code }`)
      .pipe(
        map(restCountries => {
          return CountryMapper.mapRestCountryArrToCountryArr(restCountries);
        }),
        map( countries => countries.at(0)),
        catchError(error => {
          return throwError(() => new Error(`No countries recovered woth the code: ${code}`))
        })
      );
  }

}
