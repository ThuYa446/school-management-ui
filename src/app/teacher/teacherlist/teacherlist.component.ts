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
        this.showCustomMsg(error,false);
      }
    );
  }

  showCustomMsg(msg, type) {
    if ( type === true) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Information' }); }
    if ( type === false) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Error' }); }
    if ( type === undefined) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
    if ( type === null) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Success' }); }
  }

  editForm(id:number){
    this.router.navigate(['teacher',id]);
  }

}
