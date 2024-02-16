import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/Student';
import { Subject } from 'src/app/model/Subject';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

declare var jQuery: any;
@Component({
  selector: 'app-enrollsetup',
  templateUrl: './enrollsetup.component.html',
  styleUrls: ['./enrollsetup.component.css']
})
export class EnrollsetupComponent implements OnInit {
  apiUrl = environment.apiUrl+'/subjects';
  studentApiUrl = environment.apiUrl+'/students/unregister';
  id: number = 0;
  subject: Subject = new Subject();
  students : Student [] = [];
  selectedStudent: Student [] = [];

  constructor(private http:HttpClientService,
    private ics: IntercomService,private route: ActivatedRoute,
    private router: Router) { 
  }

  validateSubject(){
    if(this.subject.title == null || this.subject.title == ''){
      this.showCustomMsg('Title is required',1);
      return false;
    }
    return true;
  }

  getAllUnRegisteredStudents(){
    this.http.doGet(this.studentApiUrl).subscribe(
      (data) => {
        if(data!= null && data != undefined && data.length != 0){
            this.students = data;
            this.students.forEach(student => {
              student.createdAt = new Date(student.createdAt).toLocaleString();
              student.updatedAt = new Date(student.updatedAt).toLocaleString();
            });
        }else{
          this.showCustomMsg('There is no unregistered student left.',1);
        }
      },
      (error) => {
        this.showCustomMsg(error,2);
      }
    );
  }

  saveSubject(){
    if(this.validateSubject()){
      
      let jsonObj = JSON.parse(JSON.stringify( this.subject));
      jsonObj.createdAt = new Date(jsonObj.createdAt);
      jsonObj.updatedAt = new Date(jsonObj.updatedAt);
      jsonObj.studentDto.forEach(student => {
        student.createdAt = new Date(student.createdAt);
        student.updatedAt = new Date(student.updatedAt);
      });
      if(this.subject.id == null || this.subject.id == 0){
        this.http.doPost(this.apiUrl,jsonObj).subscribe(
          (data) => {
            this.showCustomMsg('Subject added successfully',4);
            this.router.navigate(['enrolls']);
          },
          (error) => {
            this.showCustomMsg(error,2);
          }
        );
      }else{
        this.http.doPut(this.apiUrl+'/'+this.id,jsonObj).subscribe(
          (data) => {
            this.showCustomMsg('Subject updated successfully',4);
            this.router.navigate(['enrolls']);
          },
          (error) => {
            this.showCustomMsg(error,2);
          }
        );
      }
    }
  }

  getSubjectById(){
    this.http.doGet(this.apiUrl+'/'+this.id).subscribe(
      (data) => {
        if(data!= null || data != undefined){
          this.subject = data;
          console.log(this.subject);
        }
      },
      (error) => {
        this.showCustomMsg(error,2);
      }
    );
  }

  addStudent(){
    jQuery("#enrollpopup").modal();
    this.selectedStudent = [];
  }

  selectStudent(student,event){
    if(event.target.checked){
      this.selectedStudent.push(student);
    }else{
      let index = this.selectedStudent.indexOf(student);
      this.selectedStudent.splice(index,1);
    }
  }

  enrollStudent(){
    if(this.selectedStudent.length == 0){
      this.showCustomMsg('Please select student',1);
    }else{
      this.subject.studentDto = this.selectedStudent;
      this.saveSubject();
    }
  }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id') != null || this.route.snapshot.paramMap.get('id') != undefined){
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      if(this.id != 0){
        this.getSubjectById();
        this.getAllUnRegisteredStudents();
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
