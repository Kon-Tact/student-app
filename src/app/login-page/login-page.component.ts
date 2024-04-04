import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiAccessService } from '../api-access.service';
import { GotoService } from '../goto.service';
import { NotificationsService } from '../notifications.service';
import { account } from '../account';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})

export class LoginPageComponent implements OnInit{

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiAccessService,
    private goto: GotoService,
    private notif: NotificationsService,
    private connect: ConnectionService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  login() {
    let loggingAccount: account = this.loginForm.value;
    this.api.login(loggingAccount).subscribe({
      next: (response) => {
        this.api.setAuthToken(response.token);
        loggingAccount = response.account;
        this.connect.connectAccount(loggingAccount);
        if(loggingAccount.role === "SUPER_ADMIN" && loggingAccount.password === "admin") {
          this.connect.editConnected();
          this.goto.goToEdit();
          this.notif.showSuccess('Le compte super admin n\' est pas sécurisé. \n Un changement de mot de passe est recommandé');
        } else {
          this.goto.goToHomePage();
          this.notif.showSuccess('Authentification réussie sous le compte ' + loggingAccount.username);
        }   
      }
    });
  }
}
