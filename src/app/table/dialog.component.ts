import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DataAccessService } from "../data-access.service";

@Component({
    selector: 'dialog-component',
    templateUrl: './dialog.component.html',
    styles: ``
  })

  export class DialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>
    ) {}
  
    onYesClick(): void {
      this.dialogRef.close(true); 
    }
  }
