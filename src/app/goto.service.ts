import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GotoService {

  constructor(
    private router: Router
  ) { }

  goToHomePage() {
    this.router.navigateByUrl('/students');
  }

  goToStudentRegistration() {
    this.router.navigateByUrl('/signin');
  }

  goToAccountRegistration() {
    this.router.navigateByUrl('/register');
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }

  goToAccountList() {
    this.router.navigateByUrl('/accounts')
  }

  goToEdit() {
    this.router.navigateByUrl('/edit');
  }
}
