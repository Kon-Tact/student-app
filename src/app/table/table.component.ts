import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from '../api-access.service';
import { MatTableDataSource } from '@angular/material/table';
import { student } from '../student';
import { MatDialog } from '@angular/material/dialog'
import { DataAccessService } from '../data-access.service';
import { GotoService } from '../goto.service';
import { DialogComponent } from './dialog.component';
import { diagMessages } from '../dialogCases';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: `button {
    margin: auto 4px
  }`
})
export class TableComponent implements OnInit {
    
    dataSource: any
    studentList:student[];
    isAdmin: boolean;
    displayedColumns: String[];
   
  constructor(
    private api: ApiAccessService,
    private goto: GotoService,
    private dataServ: DataAccessService,
    private dialog: MatDialog,
    private connect: ConnectionService 
  ) {}

  ngOnInit(): void {
    this.api.getStudentList().subscribe((student) => {
      this.studentList = student;
      this.dataSource = new MatTableDataSource<student>(this.studentList);
    }) 
    this.isAdmin = this.connect.isAdmin();  
    this.isAdmin? this.displayedColumns = ['name', 'phoneNumber', 'email', 'address', 'delete'] : this.displayedColumns = ['name', 'phoneNumber', 'email', 'address'];
  }

  public get diagMessages() {
    return diagMessages;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, student: student, cases: diagMessages) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: this.dataServ.dialogMessage(cases), title: this.dataServ.dialogTitle(cases)},
      width: '250 px',
      enterAnimationDuration,
      exitAnimationDuration,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && diagMessages.DELETE) {
        this.api.deleteStudent(student).subscribe(() => { 
          this.studentList = this.studentList.filter(s => s.id !== student.id);
          this.ngOnInit();
        });
      } else if (result && diagMessages.EDIT_STUDENT) {
        this.goToEdit(student);
      }
    });
  }

  goToEdit(student: student) {
    this.dataServ.saveToUpdate(student);
    this.goto.goToStudentRegistration();
  }
}


