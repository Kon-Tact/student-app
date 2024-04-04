import { Component, HostListener, OnInit } from '@angular/core';
import { ApiAccessService } from '../api-access.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataAccessService } from '../data-access.service';
import { student } from '../student';
import { NotificationsService } from '../notifications.service';
import { GotoService } from '../goto.service';
import { studentValidator } from '../studentValidator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: `button {
    margin: auto 1%;
  }`
})

export class SigninComponent implements OnInit{

  studentForm: FormGroup;
  inEditStudent : student | null;
  snappedStudent: student;
  btnText: string;
  validator: studentValidator;

  constructor(
    private api: ApiAccessService,
    private fb: FormBuilder,
    private goto: GotoService,
    private dataServ : DataAccessService,
    private notif: NotificationsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.editOrRegister();
    this.dataServ.displayLocalStorageData();
  }

  editOrRegister() {
    if(localStorage.getItem("editStudent")) {
      this.btnText = 'Mise à jour';
      this.inEditStudent = JSON.parse(localStorage.getItem("editStudent")!);
      this.snappedStudent = JSON.parse(localStorage.getItem("snappedEditStudent")!)
      this.validator = localStorage.getItem("listVal") ? this.validatorManagement() : new studentValidator(false, false, false, false);
      this.fillForms(this.inEditStudent!);
    } else {
      this.btnText = 'Enregistrer';
    }
  }

  validatorManagement(): studentValidator {
    const booleanArray: boolean[] = localStorage.getItem('listVal')?.split(',').map(value => value === "true")!;
    return new studentValidator(booleanArray[0], booleanArray[1], booleanArray[2], booleanArray[3])
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      name: [''], 
      phoneNumber: [''],
      email: [''],
      address: ['']
    });
    this.studentForm.updateValueAndValidity();
  }

  fillForms(student: student) {
    this.studentForm.patchValue({
      name: student.name,
      phoneNumber: student.phoneNumber,
      email: student.email,
      address: student.address
    });
    this.studentForm.updateValueAndValidity();
  }

  backToList() {
    if(this.inEditStudent){
      this.dataServ.removeLocalExceptConnected();
    }
    this.goto.goToHomePage();
  }

  onSubmit() {
    if(!this.inEditStudent) {
        this.api.saveStudent(this.studentForm.value).subscribe((student) => {
        this.notif.showSuccess('L\'étudiant(e) a bien été enregistré sur la base de donnée');
        this.goto.goToHomePage();
      })
    } else {
      const account = this.studentForm.value;
      account.id = this.inEditStudent.id;
      this.api.editStudent(account).subscribe((student) => {
        this.notif.showSuccess('L\'étudiant a bien été mis à jour dans la base');
        this.dataServ.removeLocalExceptConnected();
        this.goto.goToHomePage();
      })
    }
  }

  checkDifferences(newvalue: string, field: keyof student) {
    (this.inEditStudent as any)[field] = newvalue;
    if (this.snappedStudent[field] === this.inEditStudent![field]) {
      (this.validator[field + "Changed" as keyof studentValidator] as boolean) = false;
    } else {
      (this.validator[field + "Changed" as keyof studentValidator] as boolean) = true;
    }
  }

  backToSnap(field: keyof student) {
    this.studentForm.patchValue({[field]: this.snappedStudent[field]});
  }

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    localStorage.setItem('listVal', `${this.validator.nameChanged},${this.validator.phoneNumberChanged},${this.validator.emailChanged},${this.validator.addressChanged}`);
    this.inEditStudent ? localStorage.setItem('editStudent', JSON.stringify(this.inEditStudent)) : null;
  }
    
  generateTestValue() {
    let randoPN: string = ("06" + Math.floor(Math.random() * 10000000));
    if (randoPN.length != 10) { randoPN = randoPN + Math.floor(Math.random() * 10); }
    this.dataServ.getRandoDatas().subscribe(student => {
      let randStud = student;
      randStud.email = randStud.name.toLowerCase().replace(/\s/g, '') + "@email.com";
      randStud.phoneNumber = randoPN
      randStud.address = String(Math.floor(Math.random() * 30) + 1) + " " + randStud.address;
      this.fillForms(randStud);  
    });
  }
}
