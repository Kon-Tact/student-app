import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-component',
    templateUrl: './dialog.component.html',
    styles: ``
  })

  export class DialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onYesClick(): void {
      this.dialogRef.close(true); 
    }
  }
