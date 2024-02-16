import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/model/Teacher';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacherlist',
  templateUrl: './teacherlist.component.html',
  styleUrls: ['./teacherlist.component.css']
})
export class TeacherlistComponent implements OnInit {
  apiUrl = environment.apiUrl+'/teachers';
  teachers : Teacher [] = [];

  constructor(private http:HttpClientService,
    private ics: IntercomService,private router: Router) { 
      this.getAllTeachers();
  }

  ngOnInit() {
  }

  newTeacher(){
    this.router.navigate(['teacher',0]);
  }

  getAllTeachers(){
   
    this.http.doGet(this.apiUrl).subscribe(
      (data) => {
        if(data!= null || data != undefined){
            this.teachers = data;
            this.teachers.forEach(teacher => {
              teacher.createdAt = new Date(teacher.createdAt).toLocaleString();
              teacher.updatedAt = new Date(teacher.updatedAt).toLocaleString();
            });
        }
      },
      (error) => {
        if(error == undefined){
          this.showCustomMsg('Network Connection Error',2);
        }else{
          this.showCustomMsg(error,2);
        }
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
    this.router.navigate(['teacher',id]);
  }

}
