import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital( query: string ): Observable<Country[]> {

    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
      .pipe(
        map( restCountries => {
          return CountryMapper.mapRestCountryArrToCountryArr(restCountries);
        }),
        tap( countries => {
          this.queryCacheCapital.set(query, countries);
        }),
        catchError( error => {
          return throwError(() =>  new Error(`No countries recovered which capital contains: ${query}`))
        }),
      );

  }

  searchByCountry( query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
      .pipe(
        map(restCountries => {
          return CountryMapper.mapRestCountryArrToCountryArr(restCountries);
        }),
        tap( countries => {
          this.queryCacheCountry.set(query, countries);
        }),
        catchError(error => {
          return throwError(() => new Error(`No countries recovered which name contains: ${query}`))
        })
      );
  }

  searchByRegion( region: Region): Observable<Country[]> {

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${ API_URL }/region/${ region }`)
      .pipe(
        map(restCountries => {
          return CountryMapper.mapRestCountryArrToCountryArr(restCountries);
        }),
        tap( countries => {
          this.queryCacheCountry.set(region, countries);
        }),
        catchError(error => {
          return throwError(() => new Error(`No countries recovered for this region: ${region}`))
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
