import { Component, Input, OnInit, input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAccessService } from '../api-access.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataAccessService } from '../data-access.service';
import { student } from '../student';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: ``
})
export class SigninComponent implements OnInit{

  studentForm: FormGroup;
  toUpdateStudent : student | null;
  toUpdateStudentId : number;
  updatedStudent : student;

  constructor(
    private router: Router,
    private api: ApiAccessService,
    private fb: FormBuilder,
    private dataServ : DataAccessService
  ) {}

  ngOnInit(): void {

    this.initForm();

    this.toUpdateStudent = this.dataServ.giveToUpdate();


    if (this.toUpdateStudent != null) {

      this.toUpdateStudentId = this.toUpdateStudent.id;

      console.log("Vérification des valeurs de l'étudiant a modifier")
      console.table(this.toUpdateStudent);
      
      this.studentForm.patchValue ({
        name: this.toUpdateStudent.name,
        phoneNumber: this.toUpdateStudent.phoneNumber,
        email: this.toUpdateStudent.email,
        address: this.toUpdateStudent.address,
      })

      this.studentForm.updateValueAndValidity();
    } else {
      console.log("Il s'agit d'un ajout et non d'une modification");
      
    }
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

      if(this.toUpdateStudent == null) {
        const newStudent = this.studentForm.value;
        this.api.saveStudent(newStudent).subscribe((student) => {
        console.log('L\'étudiant a bien été enregistré sue la base : ', student);
        this.studentForm.reset();
        this.ngOnInit();
        })


      } else {
        this.updatedStudent = this.studentForm.value;
        this.updatedStudent.id = this.toUpdateStudentId;
        console.table(this.updatedStudent);
        this.api.editStudent(this.updatedStudent).subscribe((student) => {
        console.log('L\'étudiant a bien été mis à jour dans la base : ', student);
        this.router.navigateByUrl('/students');
        })
      }
      
    }
  } 

  fillTestValues() {
    
    let randoName: string = "";
    let randoPN: string = ("6" + Math.floor(Math.random() * 100000000));
    if (randoPN.length != 9) {
      console.log("Numéro a 8 chiffre : " + randoPN);
      
      randoPN = randoPN + Math.floor(Math.random() * 10);

      console.log("Passé en numéro à 9 chiffre : " + randoPN);
      
    }
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
