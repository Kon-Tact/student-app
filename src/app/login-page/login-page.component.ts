import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiAccessService } from '../api-access.service';
import { GotoService } from '../goto.service';
import { NotificationsService } from '../notifications.service';
import { account } from '../account';
import { DataAccessService } from '../data-access.service';

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
    private dataServ: DataAccessService
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
    const loggingAccount: account = this.loginForm.value;
    this.api.login(loggingAccount).subscribe((account) => {
      console.log('Authentification réussie sous le compte ' + loggingAccount.username);
      this.notif.showSuccess('Authentification réussie sous le compte ' + loggingAccount.username);
      this.loginForm.reset();
      this.dataServ.accountForSession(loggingAccount);
      location.reload();
      this.goto.goToHomePage(); 
    })
  }
}
