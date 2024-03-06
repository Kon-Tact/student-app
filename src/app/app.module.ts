import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiAccessService } from './api-access.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { MatButtonModule } from '@angular/material/button';
import { RegisterConnexionComponent } from './register-connexion/register-connexion.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SigninComponent,
    RegisterConnexionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ApiAccessService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
