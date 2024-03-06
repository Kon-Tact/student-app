import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor() { }

  private jsonLastName = './assets/lastnames.json';
  private jsonFirstName = './assets/firstnames.json';
  private jsonRue = './assets/rue.json';

  getRandoData(dataType: String): Observable<string> {
    return new Observable(observer => {
      
      console.log("in get rando");
      
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
              list = data.lastname as string[];
              break
            case 'firstname':
              list = data.firstnames as string[];
              break
            case 'rue':
              list = data.streetNames as string[];
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
}
