import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/app/model/Teacher';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teachersetup',
  templateUrl: './teachersetup.component.html',
  styleUrls: ['./teachersetup.component.css']
})
export class TeachersetupComponent implements OnInit {
  apiUrl = environment.apiUrl+'/teachers';
  id: number = 0;
  teacher: Teacher = new Teacher();

  constructor(private http:HttpClientService,
    private ics: IntercomService,private route: ActivatedRoute,
    private router: Router) { 
  }

  newTeacherForm(){
    this.teacher = new Teacher();
    this.id = 0;
  }

  validateTeacher(){
    if(this.teacher.name == null || this.teacher.name == ''){
      this.showCustomMsg('Name is required',1);
      return false;
    }
    if(this.teacher.email == null || this.teacher.email == ''){
      this.showCustomMsg('Email is required',1);
      return false;
    }
    if(this.teacher.phoneNo == null || this.teacher.phoneNo == ''){
      this.showCustomMsg('Phone number is required',1);
      return false;
    }
    if(this.teacher.address == null || this.teacher.address == ''){
      this.showCustomMsg('Address is required',1);
      return false;
    }
    return true;
  }

  saveTeacher(){
    if(this.validateTeacher()){
      let jsonObj = JSON.parse(JSON.stringify( this.teacher));
      if(this.teacher.id == null || this.teacher.id == 0){
        this.http.doPost(this.apiUrl,jsonObj).subscribe(
          (data) => {
            this.showCustomMsg('Teacher added successfully',4);
            this.router.navigate(['teachers']);
          },
          (error) => {
            if(error == undefined){
              this.showCustomMsg('Network Connection Error',2);
            }else{
              this.showCustomMsg(error,2);
            }
          }
        );
      }else{
        this.http.doPut(this.apiUrl+'/'+this.id,jsonObj).subscribe(
          (data) => {
            this.showCustomMsg('Teacher updated successfully',4);
            this.router.navigate(['teachers']);
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
    }
  }

  getTeacherById(){
    this.http.doGet(this.apiUrl+'/'+this.id).subscribe(
      (data) => {
        if(data!= null || data != undefined){
          this.teacher = data;
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

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id') != null || this.route.snapshot.paramMap.get('id') != undefined){
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      if(this.id != 0){
        this.getTeacherById();
      }
    }
  }

  showCustomMsg(msg, type) {
    if ( type === 1) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Information' }); }
    if ( type === 2) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Error' }); }
    if ( type === 3) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
    if ( type === 4) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Success' }); }
  }
}
