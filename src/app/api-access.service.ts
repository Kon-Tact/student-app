import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { student } from './student';

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

  getStudent(studentId: number): Observable<student> {
    return this.http.get<student>(this.urlStudentApi + "/student/" + studentId).pipe(
      tap((student: student) => console.table(student)),
      catchError((error) => {
        console.error(error);
        return of();
      })
    );
  }

  getStudentList(): Observable<student[]> {
    return this.http.get<student[]>(this.urlStudentApi + "/student/list").pipe(
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

  private log(response: any) {
    console.table(response)
  }
}
