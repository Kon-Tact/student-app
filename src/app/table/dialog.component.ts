import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-component',
    templateUrl: './dialog.component.html',
    styles: 
   `
      .dialog-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      mat-dialog-content {
        -bottom: 10px;
      }

      mat-dialog-actions {
        margin-top: 10px;
      }
    `
  })

  export class DialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onYesClick(): void {
      this.dialogRef.close(true); 
    }

    onNoClick(): void {
      this.dialogRef.close(false);
    }
  }
