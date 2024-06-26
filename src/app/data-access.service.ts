import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from './student';
import { diagMessages } from './dialogCases';
import { account } from './account';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor() { }

  private json_url: RequestInfo = './assets/firstnames.json';
  localStorageData: { key: string, value: string }[] = [];

  getRandoDatas(): Observable<student> {
    return new Observable<student>(observer => {

      fetch(this.json_url)
        .then(response => response.json())
        .then(data => {

          let fnList: string[] = data.firstnames;
          let lnList: string[] = data.lastnames;
          let snList: string[] = data.streetnames;

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

  saveStudentToUpdate(student: student) {
    localStorage.setItem("editStudent", JSON.stringify(student));
    localStorage.setItem("snappedStudent", JSON.stringify(student));
  }

  createEmpty() {
    const newStudent = student.empty();
    localStorage.setItem("newStudent", JSON.stringify(newStudent));
    localStorage.setItem("snappedStudent", JSON.stringify(newStudent));
  }

  saveAccountToUpdate(accountToUpdate: account) {
    let accountToLocal = new account(accountToUpdate.username, '', accountToUpdate.email, accountToUpdate.role);
    accountToLocal.id = accountToUpdate.id;
    localStorage.setItem('editAccount', JSON.stringify(accountToLocal));
    localStorage.setItem('snappedEditAccount', JSON.stringify(accountToLocal));
  }

  //Test purpose method
  displayLocalStorageData() {
    this.localStorageData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          this.localStorageData.push({ key, value });
        }
      }
    }
    console.table(this.localStorageData);
  }

  removeLocalExceptConnected() {
    const tempConnected: account = JSON.parse(localStorage.getItem("connectedAccount")!);
    const tempToken: string = localStorage.getItem("auth-token")!;
    localStorage.clear();
    localStorage.setItem("auth-token", tempToken);
    localStorage.setItem("connectedAccount", JSON.stringify(tempConnected));
    this.displayLocalStorageData();
  }

  dialogMessage(cases: diagMessages): String{
    switch (cases) {
      case diagMessages.DELETE : {
        return "La suppression est définitive";
      } 
      case diagMessages.EDIT_STUDENT : {
        return "Vous allez entrer dans la modification";
      }
      case diagMessages.LOGOUT : {
        return "Cette action va vous déconnecter";
      }
      case diagMessages.ADMIN : {
        return "Vous allez changer les droits de ce compte";
      }
      case diagMessages.CHANGES: {
        return "Vous allez entrer dans la modification";
      }
      case diagMessages.CLEAR : {
        return "Vous êtes sur le point de vider la base";
      }
      default : {
        return "";
      }
    }
  }

  dialogTitle(cases: diagMessages): String {
    switch (cases) {
      case diagMessages.DELETE : {
        return "Suppression";
      } 
      case diagMessages.EDIT_STUDENT : {
        return "Edition";
      }
      case diagMessages.LOGOUT : {
        return "Deconnexion";
      }
      case diagMessages.ADMIN : {
        return "Changement de role";
      }
      case diagMessages.CHANGES : {
        return "Edition";
      }
      case diagMessages.CLEAR : {
        return "Vider la base"
      }
      default : {
        return "";
      }
    }
  }
}
