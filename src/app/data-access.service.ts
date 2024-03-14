import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from './student';
import { account } from './account';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor() { }

  private json_url: RequestInfo = './assets/firstnames.json';
  private jsonLastName = './assets/lastnames.json';
  private jsonFirstName = './assets/firstnames.json';
  private jsonRue = './assets/rue.json';
  private savedStudent: student;
  private isStudentStocked = false;
  private register = false;
  private actualAccount: account | null;

  getRandoData(dataType: String): Observable<string> {
    return new Observable(observer => {
      
      let path: RequestInfo = '';

      switch (dataType) {
        case 'lastname':
          path = this.jsonLastName;
          break
        case 'firstname':
          path = this.jsonFirstName;
          break
        case 'rue':
          path = this.jsonRue;
          break
      }

      fetch(path)
        .then(response => response.json())
        .then(data => {

          let list: string[] = [];

          switch (dataType) {
            case 'lastname':
              list = data.lastnames as string[];
              break
            case 'firstname':
              list = data.firstnames as string[];
              break
            case 'rue':
              list = data.streetnames as string[];
              break
          }

          const randomIndex = Math.floor(Math.random() * list.length);
          const randomData = list[randomIndex];

          observer.next(randomData);
          observer.complete();
        })
        .catch(error => observer.error(error));
    })
  }

  getRandoDatas(): Observable<student> {
    return new Observable<student>(observer => {

      fetch(this.json_url)
        .then(response => response.json())
        .then(data => {

          let fnList: string[] = data.firstnames;
          let lnList: string[] = data.lastnames;
          let snList: string[] = data.streetnames;

          console.table(fnList);

          let randoStud = student.empty(); 
          
          randoStud.name = this.listRand(lnList) + " " + this.listRand(fnList);
          randoStud.address = this.listRand(snList);

          observer.next(randoStud);
          observer.complete();
        })
        .catch(error => observer.error(error));
    })
  }

  listRand(list: string[]): string {
    const randIndex = Math.floor(Math.random() * list.length);
    const randElement = list[randIndex];
    return randElement;
  } 

  saveToUpdate(student: student) : boolean {
    this.savedStudent = student;
    this.isStudentStocked = true;
    return true;
  }

  giveToUpdate() : student | null {
    if (this.isStudentStocked == true) {
      this.isStudentStocked = false;
      return this.savedStudent;
    }
    return null;
  }

  accountForSession(account: account) {
    this.actualAccount = account;
    console.log(this.actualAccount);
    
  }

  connectedAccount(): account | null{

    console.log(this.actualAccount);
    
    return this.actualAccount;
  }

}
