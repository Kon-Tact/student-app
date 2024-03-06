import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from '../api-access.service';
import { MatTableDataSource } from '@angular/material/table';
import { student } from '../student';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent implements OnInit {
   dataSource: any
   studentList:student[];
   
  constructor( private api: ApiAccessService) {}

  ngOnInit(): void {
    this.api.getStudentList().subscribe((student) => {
      console.table(student);
      this.studentList = student;
      this.dataSource = new MatTableDataSource<student>(this.studentList);
    })
    
  }

  deleteStudent(student: student) {
    console.log(student.id);
    
    this.api.deleteStudent(student)
    .subscribe(() => { 
      this.studentList = this.studentList.filter(s => s.id !== student.id);
      this.ngOnInit();
    })
  }

  displayedColumns: String[] = ['id', 'name', 'phoneNumber', 'email', 'address', 'delete'];
}
