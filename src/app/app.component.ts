import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from './api-access.service';
import { NavigationEnd, OnSameUrlNavigation, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataAccessService } from './data-access.service';
import { account } from './account';
import { GotoService } from './goto.service';
import { Subscription } from 'rxjs';
import { ConnectionService } from './connection.service';
import { DialogComponent } from './table/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { diagMessages } from './dialogCases';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit{

  connectedAccount: account | null = null;
  isAdmin: boolean = false;

  constructor(
    private api: ApiAccessService,
    private connect: ConnectionService,
    private dataServ: DataAccessService,
    private goto: GotoService,
    private router: Router,  
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.updateNav();
  }

  updateNav() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("To the home page");
        this.connectedAccount = this.connect.retrieveAccount();
        this.connectedAccount ? this.isAdmin = this.connect.isAdmin() : null;    
      }
    })
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

  edit() {
    this.goto.goToEdit();
  }

  toList() {
    this.goto.goToHomePage();
  }

  public get diagMessages() {
    return diagMessages;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, cases: diagMessages) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: this.dataServ.dialogMessage(cases), title: this.dataServ.dialogTitle(cases)},
      width: '250 px',
      enterAnimationDuration,
      exitAnimationDuration,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.logout().subscribe(() => {
          this.goto.goToLoginPage();
          localStorage.removeItem('auth-token');
          this.connect.logout();
        });
      }
    });
  }
  
  logout() {
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
