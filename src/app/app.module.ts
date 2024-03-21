import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiAccessService } from './api-access.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { MatButtonModule } from '@angular/material/button';
import { RegisterConnexionComponent } from './register-connexion/register-connexion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './table/dialog.component';
import { TokenManagementService } from './token-management.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SigninComponent,
    RegisterConnexionComponent,
    EditProfilComponent,
    LoginPageComponent,
    DialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ApiAccessService,
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: TokenManagementService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
