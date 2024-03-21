import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiAccessService } from '../api-access.service';
import { GotoService } from '../goto.service';
import { NotificationsService } from '../notifications.service';
import { account } from '../account';
import { DataAccessService } from '../data-access.service';
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
    this.api.login(loggingAccount).subscribe((json) => {
      console.log('Authentification réussie sous le compte ' + loggingAccount.username);
      const tokenValue: string = json.token;
      this.api.setAuthToken(tokenValue);
      console.log(tokenValue);
      console.log(json.id);
      loggingAccount.id = json.id;
      console.log(json.role);
      loggingAccount.role = json.role;
      console.log(json.email);
      loggingAccount.email = json.email; 
      console.table(loggingAccount);
      this.connect.connectAccount(loggingAccount);
      this.goto.goToHomePage();
      this.notif.showSuccess('Authentification réussie sous le compte ' + loggingAccount.username);
    })
  }
}
