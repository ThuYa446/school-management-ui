import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/model/Subject';
import { Teacher } from 'src/app/model/Teacher';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';
declare var jQuery: any;
@Component({
  selector: 'app-coachsetup',
  templateUrl: './coachsetup.component.html',
  styleUrls: ['./coachsetup.component.css']
})
export class CoachsetupComponent implements OnInit {
  apiUrl = environment.apiUrl + '/teachers';
  subjectApiUrl = environment.apiUrl + '/subjects';
  id: number = 0;
  teacher: Teacher = new Teacher();
  subjects: Subject[] = [];
  selectedSubject: Subject[] = [];

  constructor(private http: HttpClientService,
    private ics: IntercomService, private route: ActivatedRoute,
    private router: Router) {
  }

  getAllSubjects(){
    this.showloading(true);
    this.http.doGet(this.subjectApiUrl).subscribe(
      (data) => {
        if(data!= null && data != undefined && data.length != 0){
            this.subjects = data;
            this.subjects.forEach(subject => {
              subject.createdAt = new Date(subject.createdAt).toLocaleString();
              subject.updatedAt = new Date(subject.updatedAt).toLocaleString();
            });
        }else{
          this.showCustomMsg('No data found',1);
        }
        this.showloading(false);
      },
      (error) => {
        if(error == undefined){
          this.showCustomMsg('Network Connection Error',2);
        }else{
          this.showCustomMsg(error,2);
        }
        this.showloading(false);
      }
    );
  }

  coachSubject(){
    if(this.selectedSubject.length == 0){
      this.showCustomMsg('Please select subject',1);
    }else{
      this.teacher.subjects = this.selectedSubject;
      this.saveTeacher();
    }
  }

  saveTeacher() {
    let jsonObj = JSON.parse(JSON.stringify(this.teacher));
    jsonObj.createdAt = new Date(jsonObj.createdAt);
    jsonObj.updatedAt = new Date(jsonObj.updatedAt);
    jsonObj.subjects.forEach(subject => {
      subject.createdAt = new Date(subject.createdAt);
      subject.updatedAt = new Date(subject.updatedAt);
    });
    this.showloading(true);
    this.http.doPut(this.apiUrl + '/' + this.id, jsonObj).subscribe(
      (data) => {
        this.showCustomMsg('Coach updated successfully', 4);
        this.router.navigate(['coaches']);
        this.showloading(false);
      },
      (error) => {
        if (error == undefined) {
          this.showCustomMsg('Network Connection Error', 2);
        } else {
          this.showCustomMsg(error, 2);
        }
        this.showloading(false);
      }
    );
  }

  getTeacherById() {
    this.showloading(true);
    this.http.doGet(this.apiUrl + '/' + this.id).subscribe(
      (data) => {
        if (data != null || data != undefined) {
          this.teacher = data;
          this.teacher.subjects.forEach(subject => {
            subject.createdAt = new Date(subject.createdAt).toLocaleString();
            subject.updatedAt = new Date(subject.updatedAt).toLocaleString();
          });
        }
        this.showloading(false);
      },
      (error) => {
        if (error == undefined) {
          this.showCustomMsg('Network Connection Error', 2);
        } else {
          this.showCustomMsg(error, 2);
        }
        this.showloading(false);
      }
    );
  }

  addCoach(){
    jQuery("#coachpopup").modal();
    this.selectedSubject = [];
  }

  selectSubject(subject,event){
    if(event.target.checked){
      this.selectedSubject.push(subject);
    }else{
      let index = this.selectedSubject.indexOf(subject);
      this.selectedSubject.splice(index,1);
    }
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') != null || this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      if (this.id != 0) {
        this.getTeacherById();
        this.getAllSubjects();
      }
    }
  }

  showCustomMsg(msg, type) {
    if (type === 1) { this.ics.sendBean({ t1: 'custom-msg', t2: msg, t3: 'Information' }); }
    if (type === 2) { this.ics.sendBean({ t1: 'custom-msg', t2: msg, t3: 'Error' }); }
    if (type === 3) { this.ics.sendBean({ t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
    if (type === 4) { this.ics.sendBean({ t1: 'custom-msg', t2: msg, t3: 'Success' }); }
  }

  showloading(type) {
    if (type === true) {this.ics.sendBean({t1: 'custom-loading'}); }
    if (type === false) {this.ics.sendBean({t1: 'custom-loading-off'}); }
  }
}
