import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAccessService } from '../api-access.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: ``
})
export class SigninComponent implements OnInit{
  
  studentForm: FormGroup;

  constructor(
    private router: Router,
    private api: ApiAccessService,
    private fb: FormBuilder,
    private dataServ : DataAccessService
  ) {}

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.studentForm = this.fb.group({
      name: [''],
      phoneNumber: [''],
      email: [''],
      address: [''],
    });
  }

  onSubmit() {
    if(this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      this.api.saveStudent(newStudent)
      .subscribe((student) => { console.log('L\'étudiant a bien été enregistré sue la base : ', student);
      })
      this.router.navigate(['/students'])
    }
  } 

  fillTestValues() {
    
    let randoName: string = "";
    let randoPN: string = ("6" + Math.floor(Math.random() * 100000000));
    let randoMail: string = "";
    let randoAdresse: string =  String(Math.floor(Math.random() * 30) + 1);
  
    this.dataServ.getRandoData("lastname").subscribe(lastname => {
      randoName = lastname;

      this.dataServ.getRandoData("firstname").subscribe(firstname => {
        randoMail = randoName.toLowerCase().replace(/\s/g, '') + "." + firstname.toLowerCase().replace(/\s/g, '') + "@email.com";
        randoName = randoName + " " + firstname;

        this.dataServ.getRandoData("rue").subscribe(rue => {
          randoAdresse = randoAdresse + " " + rue;
          console.log(randoName);
          console.log(randoPN);
          console.log(randoMail);
          console.log(randoAdresse);
          
          this.studentForm.patchValue({
            name: randoName,
            phoneNumber: randoPN,
            email: randoMail,
            address: randoAdresse,
          })

          console.log("BORDEL");
          
          console.log(this.studentForm.value)
          this.studentForm.updateValueAndValidity();
        })    
      })
    })
    
    this.studentForm.patchValue({
      name: randoName,
      phoneNumber: randoPN,
      email: randoMail,
      address: randoAdresse,
    })
  }

}
