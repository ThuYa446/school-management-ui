import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/Student';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
  apiUrl = environment.apiUrl+'/students';
  students : Student [] = [];

  constructor(private http:HttpClientService,
    private ics: IntercomService,private router: Router) { 
      this.getAllStudents();
  }

  ngOnInit() {
  }

  newStudent(){
    this.router.navigate(['student',0]);
  }

  getAllStudents(){
   
    this.http.doGet(this.apiUrl).subscribe(
      (data) => {
        if(data!= null && data != undefined && data.length != 0){
            this.students = data;
            this.students.forEach(student => {
              student.createdAt = new Date(student.createdAt).toLocaleString();
              student.updatedAt = new Date(student.updatedAt).toLocaleString();
            });
        }else{
          this.showCustomMsg('No data found',1);
        }
      },
      (error) => {
        this.showCustomMsg(error,2);
      }
    );
  }

  showCustomMsg(msg, type) {
    if ( type === 1) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Information' }); }
    if ( type === 2) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Error' }); }
    if ( type === 3) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
    if ( type === 4) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Success' }); }
  }

  editForm(id:number){
    this.router.navigate(['student',id]);
  }

}
