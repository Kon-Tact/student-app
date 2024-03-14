import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { TableComponent } from './table/table.component';
import { RegisterConnexionComponent } from './register-connexion/register-connexion.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';

const routes: Routes = [
  {path: 'register', component: RegisterConnexionComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'edit', component: EditProfilComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'students', component: TableComponent},
  {path: '', redirectTo: 'students', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
