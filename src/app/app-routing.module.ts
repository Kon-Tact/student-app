import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'students', component: TableComponent},
  {path: '', redirectTo: 'students', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
