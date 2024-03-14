import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from '../api-access.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataAccessService } from '../data-access.service';
import { student } from '../student';
import { NotificationsService } from '../notifications.service';
import { GotoService } from '../goto.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: `button {
    margin: auto 1%;
  }`
})

export class SigninComponent implements OnInit{

  studentForm: FormGroup;
  toUpdateStudent : student | null;
  btnText: string;

  constructor(
    private api: ApiAccessService,
    private fb: FormBuilder,
    private goto: GotoService,
    private dataServ : DataAccessService,
    private notif: NotificationsService
  ) {}

  ngOnInit(): void {

    this.init();

    //this.fillForms(student.empty());
    //this.toUpdateStudent = this.dataServ.giveToUpdate();

    /* if (this.toUpdateStudent != null) {

      this.toUpdateStudentId = this.toUpdateStudent.id;
      this.btnText = "Mise à jour"

      console.log("Vérification des valeurs de l'étudiant a modifier")
      console.table(this.toUpdateStudent);
      
      this.studentForm.patchValue ({
        name: this.toUpdateStudent.name,
        phoneNumber: this.toUpdateStudent.phoneNumber,
        email: this.toUpdateStudent.email,
        address: this.toUpdateStudent.address,
      });


      this.studentForm.updateValueAndValidity();
    } else {
      console.log("Il s'agit d'un ajout et non d'une modification");  
      this.btnText = "S'inscrire"
    } */
  }

  init() {

    this.toUpdateStudent = this.dataServ.giveToUpdate();
    console.table(this.toUpdateStudent);

    if(this.toUpdateStudent) {
      this.btnText = 'Mise à jour';
      this.fillForms(this.toUpdateStudent);
    } else {
      this.btnText = 'Enregistrer';
      this.fillForms(student.empty());
    }
  }

  fillForms(student: student) {
    this.studentForm = this.fb.group({
      name: [student.name],
      phoneNumber: [student.phoneNumber],
      email: [student.email],
      address: [student.address]
    });

    this.studentForm.updateValueAndValidity();
  }

  onSubmit() {

    if(!this.toUpdateStudent) {
        //const account = this.studentForm.value;
        //this.api.saveStudent(account).subscribe((student) => {
        this.api.saveStudent(this.studentForm.value).subscribe((student) => {
        //console.log('L\'étudiant a bien été enregistré sue la base : ', student);
        this.notif.showSuccess('L\'étudiant(e) a bien été enregistré sur la base de donnée');
        this.goto.goToHomePage();
      })

    } else {
      //this.updatedStudent = this.studentForm.value;
      //this.updatedStudent.id = this.toUpdateStudentId;
      const account = this.studentForm.value;
      account.id = this.toUpdateStudent.id;
      console.log(account);
      //console.table(this.toUpdateStudent);
      this.api.editStudent(account).subscribe((student) => {
        console.log('L\'étudiant a bien été mis à jour dans la base : ', student);
        this.notif.showSuccess('L\'étudiant a bien été mis à jour dans la base');
        /* const values = this.checkChange();
        if(values) {
          this.notif.showSuccess('L\'étudiant ' + this.updatedStudent.name + ' a bien été mis à jour dans la base\n');
        } else {
          this.notif.showSuccess('Aucune modifications n\'ont étées apportées sur l\'étudiant ' + this.updatedStudent.name);
        } */
        this.goto.goToHomePage();
      })
    }
  }

  fillTestValues() {
    
    let randoName: string = "";
    let randoPN: string = ("6" + Math.floor(Math.random() * 100000000));
    if (randoPN.length != 9) { randoPN = randoPN + Math.floor(Math.random() * 10); }
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
  }

  generateTestValue() {
    let randoPN: string = ("06" + Math.floor(Math.random() * 10000000));
    if (randoPN.length != 10) { randoPN = randoPN + Math.floor(Math.random() * 10); }
    this.dataServ.getRandoDatas().subscribe(student => {
      let randStud = student;
      randStud.email = randStud.name.toLowerCase().replace(/\s/g, '') + "@email.com";
      randStud.phoneNumber = randoPN
      randStud.address = String(Math.floor(Math.random() * 30) + 1) + " " + randStud.address;
      console.table(randStud);
      this.fillForms(randStud);  
    })
  }

  backToList() {
    this.goto.goToHomePage();
  }
}
