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
    email: "jsmith@gmail.com"
  }
  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountry().subscribe(countries=>{
      console.log(countries);
      
    })
  }
  save(f:NgForm){
    console.log(f);
    if(f.invalid){
      Object.values( f.controls ).forEach(control =>{
        control.markAllAsTouched();
      });
    }return;
    
  }
}
