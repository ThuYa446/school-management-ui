import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/Student';
import { StudentType } from 'src/app/model/StudentType';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-studentsetup',
  templateUrl: './studentsetup.component.html',
  styleUrls: ['./studentsetup.component.css']
})
export class StudentsetupComponent implements OnInit {
  apiUrl = environment.apiUrl+'/students';
  id: number = 0;
  student: Student = new Student();
  studentTypes = Object.values(StudentType);

  constructor(private http:HttpClientService,
    private ics: IntercomService,private route: ActivatedRoute,
    private router: Router) { 
  }

  newStudentForm(){
    this.student = new Student();
    this.id = 0;
  }

  validateStudent(){
    if(this.student.studentType == null || this.student.studentType == ''){
      this.showCustomMsg('Student type is required',1);
      return false;
    }
    if(this.student.name == null || this.student.name == ''){
      this.showCustomMsg('Name is required',1);
      return false;
    }
    if(this.student.email == null || this.student.email == ''){
      this.showCustomMsg('Email is required',1);
      return false;
    }
    if(this.student.phoneNo == null || this.student.phoneNo == ''){
      this.showCustomMsg('Phone number is required',1);
      return false;
    }
    if(this.student.address == null || this.student.address == ''){
      this.showCustomMsg('Address is required',1);
      return false;
    }
    return true;
  }

  saveStudent(){
    if(this.validateStudent()){
      let jsonObj = JSON.parse(JSON.stringify( this.student));
      if(this.student.id == null || this.student.id == 0){
        this.http.doPost(this.apiUrl,jsonObj).subscribe(
          (data) => {
            this.showCustomMsg('Student added successfully',4);
            this.router.navigate(['students']);
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
            this.showCustomMsg('Student updated successfully',4);
            this.router.navigate(['students']);
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

  getStudentById(){
    this.http.doGet(this.apiUrl+'/'+this.id).subscribe(
      (data) => {
        if(data!= null || data != undefined){
          this.student = data;
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
        this.getStudentById();
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
