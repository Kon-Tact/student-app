import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from './api-access.service';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataAccessService } from './data-access.service';
import { account } from './account';
import { GotoService } from './goto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit{

  connectedAccount: account | null = null;

  constructor(
    private api: ApiAccessService,
    private dataServ: DataAccessService,
    private goto: GotoService,
  ){}

  ngOnInit(): void {
    this.connectedAccount = this.dataServ.connectedAccount();
    console.log(this.connectedAccount);
    
  }

  studentRegistration(){
    this.goto.goToStudentRegistration();
  }

  register() {
    this.goto.goToAccountRegistration();
  }

  login() {
    this.goto.goToLoginPage();
  }

  clearBase() {
    if(window.confirm('Êtes vous sûr(e) de vouloir complètement vider la base de donnée ? \nCette action est irréversible')) {
      this.api.clearBase().subscribe(() => {
        console.log("Base cleared");
        location.reload();
      });  
    }
  }
}
