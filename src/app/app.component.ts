import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from './api-access.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit{

  constructor(
    private api: ApiAccessService,
    private router: Router
  ){}

  ngOnInit(): void {
      
  }

  goToSignIn(){
    this.router.navigate(['/signin']);
  }

  clearBase() {
    this.api.clearBase().subscribe(() => {
      console.log("Base cleared");
      location.reload();
    });
    
  }
}
