import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAccessService } from '../api-access.service';
import { DataAccessService } from '../data-access.service';
import { NotificationsService } from '../notifications.service';
import { GotoService } from '../goto.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styles: `button {
    margin: auto 1%;
  }`

})
export class EditProfilComponent implements OnInit{
  
  editAccountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private goto: GotoService,
    private api: ApiAccessService,
    private dataServ: DataAccessService,
    private notif: NotificationsService
  ) {}

  ngOnInit(): void {
    const connectedAccount = this.dataServ.connectedAccount();
    this.initForm();

    this.editAccountForm.patchValue({
      username: connectedAccount?.username,
      password: connectedAccount?.password,
      email: connectedAccount?.email
  })
  }

  initForm() {
    this.editAccountForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
    });
  }

  backToHome() {
    this.goto.goToHomePage();
  }

  onSubmit() {
    const newAccount = this.editAccountForm.value;
    this.api.editAccount(newAccount).subscribe((account) => {
      console.log("Le compte a bien été mis à jour dans la base : " + account);
      this.notif.showSuccess("Votre profil a bien été mis à jour dans la base");
      this.dataServ.accountForSession(newAccount);
      this.goto.goToHomePage();
    })
  }
}
