import { Injectable } from '@angular/core';
import { account } from './account';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  public connectedAccount: account | null;
  private authAdmin: boolean = false;
  private authSuperAdmin: boolean = false;
  public isConnectedAccountPresent: string = "isConnectedAccountPresent";

  connectAccount(acc: account) {
    this.connectedAccount = new account(acc.username, '', acc.email, acc.role);
    this.connectedAccount.id = acc.id;
    this.locallyStoring();
    this.roleManagement();
  }

  retrieveAccount() {
    if (localStorage.getItem('connectedAccount')) {
      this.connectedAccount = JSON.parse(localStorage.getItem('connectedAccount')!)
      this.roleManagement();
    }
  }

  roleManagement() {
    this.authSuperAdmin = this.connectedAccount?.role === "SUPER_ADMIN" ? true : false;
    this.authAdmin = this.connectedAccount?.role.includes("ADMIN") ? true : false;
  }


  isAdmin(): boolean {
    return this.authAdmin;
  }

  isSuperAdmin(): boolean{
    return this.authSuperAdmin;
  }

  logout() {
    this.authAdmin = false;
    this.authSuperAdmin = false;
    localStorage.clear();
  }

  locallyStoring()  {
    localStorage.setItem('connectedAccount', JSON.stringify(this.connectedAccount));
  }

  editConnected() {
    localStorage.setItem('connectedSnapped', JSON.stringify(this.connectedAccount));
    localStorage.setItem('connectedTemp', JSON.stringify(this.connectedAccount));
  }
}
