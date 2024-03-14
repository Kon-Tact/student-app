import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { student } from './student';
import { account } from './account';

@Injectable({
  providedIn: 'root'
})
export class ApiAccessService {

  private urlStudentApi = 'http://localhost:8080';

  // private httpOptions = { headers: new  HttpHeaders({'Content-Type': 'application/json' 'Access-Control-Allow-Origin'}) };
  private httpOptions =  new  HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')

  constructor(
    private http: HttpClient
  ) {}

  //Never used
  getStudent(studentId: number): Observable<student> {
    const studUrl = this.urlStudentApi + "/student/" + studentId;
    console.log(studUrl);
    console.log("Niveau d'autorisation : User");
    
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
    console.log(listUrl);
    console.log("Niveau d'autorisation : Tout le monde");
    
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
    console.log(saveUrl);
    console.log("Niveau d'autorisation : User");
     
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
    console.log(clearUrl);
    console.log("Niveau d'autorisation : Admin");
    
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
    console.log(editUrl);
    console.table(student);
    console.table(this.httpOptions);
    console.log("Niveau d'autorisation : User");
    
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
    console.log(delUrl);
    console.log("Niveau d'autorisation : Admin");
    
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
  getAccount(accountId: number): Observable<account> {
    const accountUrl = this.urlStudentApi + "/account/" + accountId;
    console.log(accountUrl);
    console.log("Niveau d'autorisation : User");
    
    return this.http.get<account>(accountUrl).pipe(
      tap((account: account) => console.table(account)),
      catchError((error) => {
        console.error(error);
        return of();
      })
    );
  }

  //Never used
  getAccountList(): Observable<account[]> {
    const accListUrl = this.urlStudentApi + "/account/list";
    console.log();
    console.log("Niveau d'autorisation : Admin");
    
    return this.http.get<account[]>(accListUrl).pipe(
      tap((accountList: account[]) => this.log(accountList)),
      catchError((error) => {
        console.error(error);
        return of ([]);
      })
    );
  }
  
  saveAccount(account: account): Observable<account> {
    const saveUrl = this.urlStudentApi + "/account/save"; 
    console.log(saveUrl);
    console.table(account);
    console.table(this.httpOptions);
    console.log("Niveau d'autorisation : Tout le monde");

    return this.http.post<account>(saveUrl, account, {'headers': this.httpOptions}).pipe(
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
    console.log(clearUrl);
    console.log("Niveau d'autorisation : Admin");
    
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
    console.log(editUrl);
    console.table(account);
    console.table(this.httpOptions);
    console.log("Niveau d'autorisation : User");
    
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
    console.log(delUrl);
    console.log("Niveau d'autorisation : Admin");
    
    return this.http.delete<null>(delUrl).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        console.error(error);
        return of();
      })
    )
  }

  login(account: account): Observable<account> {
    const loginUrl = `${this.urlStudentApi}/account/login`;
    console.log(loginUrl);
    console.table(account);
    console.table(this.httpOptions);
    console.log("Niveau d'autorisation : Tout le monde");
    
    return this.http.post<account>(loginUrl, account, {'headers': this.httpOptions}).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        console.error(error);
        return of();
      })
    )  
  }

  private log(response: any) {
    console.log("Notification de réussite du service ApiAccess :");
    console.table(response)
  }
}
