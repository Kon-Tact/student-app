import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from './api-access.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DataAccessService } from './data-access.service';
import { account } from './account';
import { GotoService } from './goto.service';
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

  constructor(
    private api: ApiAccessService,
    private connect: ConnectionService,
    private dataServ: DataAccessService,
    private goto: GotoService,
    private router: Router,  
    private dialog: MatDialog,
  ){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        const fromUrl = this.router.url;
        if(fromUrl === '/edit') {
          this.dataServ.removeLocalExceptConnected();
        }
        if(fromUrl === '/register') {
          this.dataServ.removeLocalExceptConnected();
        }
      }
    })
  }

  ngOnInit() {
    this.updateNav();
  }

  updateNav() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.connect.retrieveAccount();
        this.connectedAccount = this.connect.connectedAccount;    
      }
    });
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
    this.connect.editConnected();
    this.goto.goToEdit();
    this.forcePageRefreshIfSameURL();
  }

  toList() {
    this.goto.goToHomePage();
  }

  public get diagMessages() {
    return diagMessages;
  }

  toAccounts() {
    this.goto.goToAccountList();
  }

  clearPossible(): boolean {
    if(this.connectedAccount?.role.includes("ADMIN")) {
      if(localStorage.getItem("isStudentStocked")) {
        return false;
      }
      return true
    }
    return false;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, cases: diagMessages) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: this.dataServ.dialogMessage(cases), title: this.dataServ.dialogTitle(cases)},
      width: '250 px',
      enterAnimationDuration,
      exitAnimationDuration,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && diagMessages.LOGOUT) {
        this.api.logout().subscribe(() => {
          this.connect.logout();
          location.reload();
        });
      } else if (result && diagMessages.CLEAR) {
        if(localStorage.getItem(""))
        this.api.clearBase().subscribe(() => {
          location.reload();
        });  
      }
    });
  }

  forcePageRefreshIfSameURL() {
    const currentURL = window.location.href;
    if (currentURL === "http://localhost:4200/edit") {
      location.reload();
    }
  }
}
