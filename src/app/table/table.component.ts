import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from '../api-access.service';
import { MatTableDataSource } from '@angular/material/table';
import { student } from '../student';
import { Router } from '@angular/router';
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: `button {
    margin: auto 4px
  }`
})
export class TableComponent implements OnInit {
    modify: boolean = false;
    dataSource: any
    studentList:student[];
    selectedStudent : student;
   
  constructor(
    private api: ApiAccessService,
    private router: Router,
    private dataServ: DataAccessService
  ) {}

  ngOnInit(): void {
    this.api.getStudentList().subscribe((student) => {
      console.log("Affichage des valeurs initialisées dans le tableau")
      console.table(student);
      this.studentList = student;
      this.dataSource = new MatTableDataSource<student>(this.studentList);
    })
    
  }

  deleteStudent(student: student) {
    if(window.confirm('Êtes vous sûr(e) de vouloir supprimer l\'étudiant(e) ' + student.name + ' de la base de donnée ? \nCette action est définitive.')) {
      console.log(student.id);
    
      this.api.deleteStudent(student)
      .subscribe(() => { 
      this.studentList = this.studentList.filter(s => s.id !== student.id);
      this.ngOnInit();
      })
    }
    
  }

  goToEdit(student: student) {
    this.dataServ.saveToUpdate(student);
    console.log("Affichage de l'étudiant envoyé pour la modification")
    console.table(student)
    this.router.navigateByUrl('/signin');
  }

  displayedColumns: String[] = ['name', 'phoneNumber', 'email', 'address', 'delete'];
}
