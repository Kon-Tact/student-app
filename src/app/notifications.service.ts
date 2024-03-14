import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000
    })
  }
}
