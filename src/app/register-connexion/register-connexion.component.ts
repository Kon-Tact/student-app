import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiAccessService } from '../api-access.service';
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
    let newAccount = this.accountForm.value
    this.api.saveAccount(newAccount).subscribe((response) => {
      this.api.setAuthToken(response.token);
      newAccount = response.account;
      this.connect.connectAccount(newAccount);
      this.goto.goToHomePage();
      this.notif.showSuccess('Authentification réussie sous le compte ' + newAccount.username);
    })
  }  
}
