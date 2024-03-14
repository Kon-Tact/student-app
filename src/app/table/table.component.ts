import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from '../api-access.service';
import { MatTableDataSource } from '@angular/material/table';
import { student } from '../student';
import { MatDialog } from '@angular/material/dialog'
import { DataAccessService } from '../data-access.service';
import { GotoService } from '../goto.service';
import { DialogComponent } from './dialog.component';

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
   
  constructor(
    private api: ApiAccessService,
    private goto: GotoService,
    private dataServ: DataAccessService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.api.getStudentList().subscribe((student) => {
      this.studentList = student;
      this.dataSource = new MatTableDataSource<student>(this.studentList);
    })    
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, student: student) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250 px',
      enterAnimationDuration,
      exitAnimationDuration,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.deleteStudent(student).subscribe(() => { 
          this.studentList = this.studentList.filter(s => s.id !== student.id);
          this.ngOnInit();
        });
      }
    });
  }

  goToEdit(student: student) {
    this.dataServ.saveToUpdate(student);
    this.goto.goToEdit();
  }

  displayedColumns: String[] = ['name', 'phoneNumber', 'email', 'address', 'delete'];
}


