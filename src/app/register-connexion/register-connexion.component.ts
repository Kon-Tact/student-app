import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataAccessService } from '../data-access.service';
import { ApiAccessService } from '../api-access.service';
import { Router } from '@angular/router';
import { account } from '../account';
import { NotificationsService } from '../notifications.service';
import { GotoService } from '../goto.service';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-register-connexion',
  templateUrl: './register-connexion.component.html',
  styles: `button {
    margin: auto 1%;
  }`
})

export class RegisterConnexionComponent implements OnInit{

  accountForm: FormGroup;

  constructor (
    private fb: FormBuilder,
    private connect: ConnectionService,
    private api: ApiAccessService,
    private goto: GotoService,
    private notif: NotificationsService
  ) {}

  ngOnInit(): void {
      this.initForm();
  }

  initForm() {
    this.accountForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
    });
  }

  backToHome() {
    this.goto.goToHomePage();
  }
  
  onSubmit() {
    const newAccount = this.accountForm.value
    this.api.saveAccount(newAccount).subscribe((account) => {
      this.notif.showSuccess("Le compte a bien été enregistré dans la base");
      this.connect.connectAccount(newAccount);
      this.goto.goToHomePage();  
    })
  }  
}
