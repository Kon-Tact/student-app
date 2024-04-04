import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from '../api-access.service';
import { ConnectionService } from '../connection.service';
import { account } from '../account';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../table/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataAccessService } from '../data-access.service';
import { diagMessages } from '../dialogCases';
import { NotificationsService } from '../notifications.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GotoService } from '../goto.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styles: `button {
    margin: auto 1%;
  }`
})
export class AccountListComponent implements OnInit{

  accountList: account[];
  filteredList: account[];
  dataSource: any;
  displayedColumns: string[];
  connectedAccount: account;
  event: MatCheckboxChange;

  constructor (
    private api: ApiAccessService,
    private dialog: MatDialog,
    private dataServ: DataAccessService,
    private connect: ConnectionService,
    private notif: NotificationsService,
    private goto: GotoService
  ) {}

  ngOnInit(): void {
    this.connectedAccount = this.connect.connectedAccount!;
    this.getDatas();
  }

  getDatas() {
    this.api.getAccountList().subscribe((accounts) => {
      this.accountList = accounts;
      this.filteredList = this.accountList.filter(account => account.id != this.connectedAccount.id);
      this.initTable();
    }) 
  }

  public get diagMessages() {
    return diagMessages;
  }

  initTable() {
    this.dataSource = new MatTableDataSource<account>(this.filteredList);
    this.displayedColumns = ['username', 'email', 'role', 'actions'];
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, account: account, cases: diagMessages) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: this.dataServ.dialogMessage(cases), title: this.dataServ.dialogTitle(cases)},
      width: '250 px',
      enterAnimationDuration,
      exitAnimationDuration,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && cases == diagMessages.DELETE) {
        if(account.role !== "SUPER_ADMIN") {
          this.api.deleteAccountById(account).subscribe(() => { 
            this.notif.showSuccess("Le compte a bien été supprimé");
            this.filteredList = this.accountList.filter(a => a.id != account.id && a.id != this.connectedAccount.id);
            this.initTable();
          });
        } else {
          this.notif.showSuccess("Ce compte est protégé et n'est pas supprimable");
        }
      } else if (result && cases == diagMessages.ADMIN) {
        let idRole: string[] = [account.id, account.role];
        this.api.changeRole(idRole).subscribe(() =>{
          this.notif.showSuccess("Le role de ce compte a bien été modifié");
          this.initTable();
        });
      } else if (result && diagMessages.CHANGES) {
        this.dataServ.saveAccountToUpdate(account);
        this.goto.goToEdit();
      } else if (!result && diagMessages.ADMIN){
        this.getDatas();
      } 
    });
  }

  isAdmin(account: account): boolean {
    return account.role.includes('ADMIN') ? true : false;
  }

  isSuperAdmin(account: account): boolean {
    return account.role.includes('SUPER_ADMIN') ? true : false;
  }
}
