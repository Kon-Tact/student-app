import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { student } from './student';
import { account } from './account';
import { accountResponse } from './accountResponse';
import { NotificationsService } from './notifications.service';

interface RoleResponse {
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiAccessService {

  private urlStudentApi = 'http://localhost:8080';
  private authTokenKey = 'auth-token';

  // private httpOptions = { headers: new  HttpHeaders({'Content-Type': 'application/json' 'Access-Control-Allow-Origin'}) };
  private httpOptions =  new  HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')

  constructor(
    private http: HttpClient,
    private notif: NotificationsService
  ) {}

  //Never used
  getStudent(studentId: number): Observable<student> {
    const studUrl = this.urlStudentApi + "/student/" + studentId;
    
    return this.http.get<student>(studUrl).pipe(
      tap((student: student) => console.table(student)),
      catchError((error) => {
        console.error(error);
        return of();
      })
    );
  }

  getStudentList(): Observable<student[]> {
    const listUrl = this.urlStudentApi + "/student/list";
    
    return this.http.get<student[]>(listUrl).pipe(
      tap((studentList: student[]) => this.log(studentList)),
      catchError((error) => {
        console.error(error);
        return of ([]);
      })
    );
  }
  
  saveStudent(student: student): Observable<student> {
    const saveUrl = this.urlStudentApi + "/student/save";
     
    return this.http.post<student>(saveUrl, student, {'headers': this.httpOptions}).pipe(
      tap((student) => this.log(student)),
      catchError((error) => {
        console.error(error);
        return of ();
      })
    )
  }

  clearBase(): Observable<null> {
    const clearUrl = this.urlStudentApi + "/student/clear";
    
    return this.http.delete<null>(clearUrl).pipe(
      tap(() => this.log("Success")),
      catchError((error) => {
        console.error(error);
        return of ();
      })
    )
  }

  editStudent(student: student): Observable<student> {
    const editUrl = this.urlStudentApi + "/student/edit";
    
    return this.http.put<student>(editUrl, student, {'headers': this.httpOptions}).pipe(
      tap((student) => this.log(student)),
      catchError((error) => {
        console.error(error);
        return of ();
      })
    ) 
  }

  deleteStudent(student: student): Observable<null> {
    const delUrl = `${this.urlStudentApi}/student/delete?id=${student.id}`;
    
    return this.http.delete<null>(delUrl).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        console.error(error);
        if(error.status === 0) {
          console.error('Error CORS: La requête a été bloquée par le navigateur')
        }
        return of();
      })
    )
  }

  //Never used
  getRole(username: string): Observable<RoleResponse> {
    const accountUrl = this.urlStudentApi + "/account/role";
    
    return this.http.post<RoleResponse>(accountUrl, username, {'headers': this.httpOptions}).pipe(
      tap((role: RoleResponse) => console.table(role.role)),
      catchError((error) => {
        console.error(error);
        return of();
      })
    );
  }

  //Never used
  getAccountList(): Observable<account[]> {
    const accListUrl = this.urlStudentApi + "/account/list";
    
    return this.http.get<account[]>(accListUrl).pipe(
      tap((accountList: account[]) => this.log(accountList)),
      catchError((error) => {
        console.error(error);
        return of ([]);
      })
    );
  }
  
  saveAccount(account: account): Observable<accountResponse> {
    const saveUrl = this.urlStudentApi + "/account/save";

    return this.http.post<accountResponse>(saveUrl, account, {'headers': this.httpOptions}).pipe(
      tap((account) => this.log(account)),
      catchError((error) => {
        console.error(error);
        return of ();
      })
    )
  }

  //Never used
  deleteAllAccount(): Observable<null> {
    const clearUrl = this.urlStudentApi + "/account/clear";
    
    return this.http.delete<null>(clearUrl).pipe(
      tap(() => this.log("Success")),
      catchError((error) => {
        console.error(error);
        return of ();
      })
    )
  }

  editAccount(account: account): Observable<account> {
    const editUrl = this.urlStudentApi + "/account/edit";
    
    return this.http.put<account>(editUrl, account, {'headers': this.httpOptions}).pipe(
      tap((account) => this.log(account)),
      catchError((error) => {
        console.error(error);
        return of ();
      })
    ) 
  }

  //Never used
  deleteAccountById(account: account): Observable<null> {
    const delUrl = `${this.urlStudentApi}/account/delete?id=${account.id}`;
    
    return this.http.delete<null>(delUrl).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        console.error(error);
        return of();
      })
    )
  }

  login(account: account): Observable<accountResponse> {
    const loginUrl = `${this.urlStudentApi}/account/login`;
    
    return this.http.post<accountResponse>(loginUrl, account, {'headers': this.httpOptions}).pipe(
      catchError((error) => {
        console.error(error);
        this.notif.showSuccess("L'identifiant ou le mot de passe n'ont pas étés reconnus");
        return of();
      })
    )  
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  logout(): Observable<null> {
    const logoutUrl = `${this.urlStudentApi}/account/logout`;
    
    return  this.http.post<null>(logoutUrl, {'headers': this.httpOptions}).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        console.error(error);
        return of();
      })
    )
  }

  changeRole(idRole: string[]): Observable<string> {
    const changeRoleUrl = `${this.urlStudentApi}/account/role`;
    
    return this.http.post<string>(changeRoleUrl, idRole, {'headers': this.httpOptions}).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        console.error(error);
        this.notif.showSuccess("Il y a eu un problème lors de la modification du role");
        return of();
      })
    )
  }

  private log(response: any) {
  }
}
