import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  f: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  ngOnInit(): void {
  }

  get hobbies() {
    return this.f.get('hobbies') as FormArray;
  }
  get nameNotValid() {
    return this.f.get('name').invalid && this.f.get('name').touched;
  }
  get surnameNotValid() {
    return this.f.get('surname').invalid && this.f.get('surname').touched;
  }
  get emailNotValid() {
    return this.f.get('email').invalid && this.f.get('email').touched;
  }
  get cityNotValid() {
    return this.f.get('address.city').invalid && this.f.get('address.city').touched;
  }
  get streetNotValid() {
    return this.f.get('address.street').invalid && this.f.get('address.street').touched;
  }
  get pass1NotValid() {
    return this.f.get('pass1').invalid && this.f.get('pass1').touched;
  }
  get pass2NotValid() {
    const pass1 = this.f.get('pass1').value;
    const pass2 = this.f.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }

  createForm() {
    this.f = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this.fb.array([

      ])
    },{
      validators: this.samePasswords('pass1','pass2')
    })
  }

  samePasswords(pass1Name: string, pass2Name: string){
    return(formGroup:FormGroup)=>{
      const pass1Control=formGroup.controls[pass1Name]
      const pass2Control=formGroup.controls[pass2Name]
    if(pass1Control.value === pass2Control.value){
      pass2Control.setErrors(null);
    }else{
      pass2Control.setErrors({notEqual: true});
    }
    }
    
  }

  addHobbie() {
    this.hobbies.push(this.fb.control(''));
  }
  deleteHobbie(i: number) {
    this.hobbies.removeAt(i);
  }

  save() {
    console.log(this.f);
    if (this.f.invalid) {
      Object.values(this.f.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
  }

}
