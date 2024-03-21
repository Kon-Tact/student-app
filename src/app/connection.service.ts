import { Injectable } from '@angular/core';
import { account } from './account';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  private account: account | null;
  private authAdmin: boolean = false;
  private authSuperAdmin: boolean = false;
  

  connectAccount(account: account) {
    this.account = account;
    this.locallyStoring(account);
    account.role == "ADMIN" ? this.authAdmin = true : null;
    if (account.role == "SUPER_ADMIN") {
      this.authSuperAdmin = true;
      this.authAdmin = true;
    }
    console.log(this.account);   
  }

  retrieveAccount(): account | null{
    console.log(this.account);
    if (!this.account && localStorage.length > 0) {
      this.locallyRetrieve();
    }
    return this.account;
  }


  isAdmin(): boolean {
    return this.authAdmin;
  }

  setSuperAdmin() {
    this.authSuperAdmin = true;
  }

  isSuperAdmin(): boolean{
    return this.authSuperAdmin;
  }

  logout() {
    this.authAdmin = false;
    this.authSuperAdmin = false;
    this.account = null;
    localStorage.clear();
  }

  locallyStoring(account: account)  {
    localStorage.setItem('id', account.id.toString());
    localStorage.setItem('username', account.username);
    localStorage.setItem('password', account.password);
    localStorage.setItem('email', account.email);
    localStorage.setItem('role', account.role);
  }

  locallyRetrieve() {
    console.log("in locally retrieve");
    
    let localAccount: account = new account();

    localAccount.id = localStorage.getItem('id')!;
    localAccount.username = localStorage.getItem('username')!;
    localAccount.password = localStorage.getItem('password')!;
    localAccount.email = localStorage.getItem('email')!;
    localAccount.role = localStorage.getItem('role')!;
    
    this.account = localAccount;
  }
}
