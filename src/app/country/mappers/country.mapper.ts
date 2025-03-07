import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-country.interface";

export class CountryMapper {

  static mapRestCountryToCountry( restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital?.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.official,
      population: restCountry.population,
      region: restCountry.region,
      spaName: restCountry.translations['spa'].official,
      subregion: restCountry.subregion
    }
  }

  static mapRestCountryArrToCountryArr( restCountries: RESTCountry[]): Country[] {
    return restCountries.map( this.mapRestCountryToCountry );
  }
}
