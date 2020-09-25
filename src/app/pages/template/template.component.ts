import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user = {
    name: "John",
    surname: "Smith",
    email: "jsmith@gmail.com",
    country: 'AND',
    gender: 'F'
  }

  countries: any[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountry().subscribe(countries=>{
      this.countries = countries;
      this.countries.unshift({
        name: '[Select your country]',
        code: ''
      })
    })
  }
  save(f:NgForm){
    console.log(f);
    console.log(f.value);
    
    if(f.invalid){
      Object.values( f.controls ).forEach(control =>{
        control.markAllAsTouched();
      });
    }return 
    
  }
}
