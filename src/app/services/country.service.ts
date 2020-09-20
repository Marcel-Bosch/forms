import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountry(){
   return this.http.get('https://restcountries.eu/rest/v2/')
   .pipe(
     map((ans:any[])=>{
       return ans.map(country=>{
         return {
           name: country.name,
           code: country.alpha3Code
         }
       })
     })
   );
  }
}
