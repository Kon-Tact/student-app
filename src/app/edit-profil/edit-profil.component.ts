import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiAccessService } from '../api-access.service';
import { NotificationsService } from '../notifications.service';
import { GotoService } from '../goto.service';
import { ConnectionService } from '../connection.service';
import { account } from '../account';
import { diagMessages } from '../dialogCases';
import { accountValidator } from '../accountValidator';
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styles: `button {
    margin: auto 1%;
  }`
})
export class EditProfilComponent implements OnInit {

  editAccountForm: FormGroup;
  isOtherAccount: boolean = false;
  connectedAccount: account;
  inEditAccount: account | null;
  snappedAccount: account;
  validator: accountValidator;

  constructor(
    private fb: FormBuilder,
    private goto: GotoService,
    private api: ApiAccessService,
    private connect: ConnectionService,
    private notif: NotificationsService,
    private dataServ: DataAccessService
  ) { }

  ngOnInit(): void {
    this.start();
    this.dataServ.displayLocalStorageData();
  }

  start() {
    this.initForm();
    this.snappedAccount = localStorage.getItem("snappedEditAccount") ? JSON.parse(localStorage.getItem("snappedEditAccount")!) : JSON.parse(localStorage.getItem("connectedSnapped")!);
    this.validator = localStorage.getItem("listVal") ? this.validatorManagement() : new accountValidator(false, false, false, false);
    this.isOtherAccount = localStorage.getItem("connectedTemp") ? false : true;
    this.inEditAccount = this.isOtherAccount ? JSON.parse(localStorage.getItem("editAccount")!) : JSON.parse(localStorage.getItem("connectedTemp")!);
    this.fillForm(this.inEditAccount!);
  }

  validatorManagement(): accountValidator {
    const booleanArray: boolean[] = localStorage.getItem('listVal')?.split(',').map(value => value === "true")!;
    return new accountValidator(booleanArray[0], booleanArray[1], booleanArray[2], booleanArray[3])
  }

  initForm() {
    this.editAccountForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      roleB: [false]
    });
    this.editAccountForm.updateValueAndValidity();
  }

  fillForm(account: account) {
    this.editAccountForm.patchValue({
      username: account.username,
      password: account.password,
      email: account.email,
      roleB: account.roleB
    });
    this.editAccountForm.updateValueAndValidity();
  }

  backToHome() {
    this.dataServ.removeLocalExceptConnected();
    if(this.isOtherAccount) {
      this.goto.goToAccountList();
    } else {
      this.goto.goToHomePage();
    }  
  }

  public get diagMessages() {
    return diagMessages;
  }

  onSubmit() {
    const newAccount = this.inEditAccount;
    newAccount!.role = this.inEditAccount?.roleB === true ? "ADMIN" : "USER";
    console.log(newAccount);
    this.api.editAccount(newAccount!).subscribe((account) => {
      if (!this.isOtherAccount) {
        this.connect.connectAccount(newAccount!);
        this.notif.showSuccess("Votre profil a bien été mis à jour dans la base");
      } else {
        this.notif.showSuccess("Le compte a bien été modifié");
      }
      this.goto.goToHomePage();
    })
  }

  checkDifferences(newvalue: string, field: keyof account) {
    (this.inEditAccount as any)[field] = newvalue;
    if (this.snappedAccount[field] === this.inEditAccount![field]) {
      (this.validator[field + "Changed" as keyof accountValidator] as boolean) = false;
    } else {
      (this.validator[field + "Changed" as keyof accountValidator] as boolean) = true;
    }
  }

  backToSnap(field: keyof account) {
    this.editAccountForm.patchValue({[field]: this.snappedAccount[field]});
  }

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    localStorage.setItem('listVal', `${this.validator.usernameChanged},${this.validator.passwordChanged},${this.validator.emailChanged},${this.validator.roleBChanged}`);
    this.isOtherAccount ? localStorage.setItem('editAccount', JSON.stringify(this.inEditAccount)) : localStorage.setItem('connectedTemp', JSON.stringify(this.inEditAccount));
  }
} 
