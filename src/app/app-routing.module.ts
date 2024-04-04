import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { TableComponent } from './table/table.component';
import { RegisterConnexionComponent } from './register-connexion/register-connexion.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { ConnectionService } from './connection.service';
import { createAuthGuard } from './auth.guard';
import { GotoService } from './goto.service';
import { AccountListComponent } from './account-list/account-list.component';

const routes: Routes = [
  {path: 'register', component: RegisterConnexionComponent},
  {path: 'students', component: TableComponent, canActivate: ['AuthGuard']},
  {path: 'accounts', component: AccountListComponent, canActivate: ['AuthGuard']},
  {path: 'login', component: LoginPageComponent},
  {path: 'edit', component: EditProfilComponent, canActivate: ['AuthGuard']},
  {path: 'signin', component: SigninComponent, canActivate: ['AuthGuard']},
  
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ConnectionService,
    {
      provide: 'AuthGuard',
      useFactory: (connectServ: ConnectionService, goto: GotoService) => createAuthGuard(goto),
      deps:[ConnectionService, GotoService]
    }
    
  ]
})
export class AppRoutingModule { }
