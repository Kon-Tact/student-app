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
    this.toUpdateStudent = this.dataServ.giveToUpdate();
    this.btnText = this.toUpdateStudent ? 'Mise à jour' : 'Enregistrer';
    this.fillForms(this.toUpdateStudent || student.empty());
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
        this.api.saveStudent(this.studentForm.value).subscribe((student) => {
        this.notif.showSuccess('L\'étudiant(e) a bien été enregistré sur la base de donnée');
        this.goto.goToHomePage();
      })
    } else {
      const account = this.studentForm.value;
      account.id = this.toUpdateStudent.id;
      this.api.editStudent(account).subscribe((student) => {
        this.notif.showSuccess('L\'étudiant a bien été mis à jour dans la base');
        this.goto.goToHomePage();
      })
    }
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
    });
  }

  backToList() {
    this.goto.goToHomePage();
  }
}
