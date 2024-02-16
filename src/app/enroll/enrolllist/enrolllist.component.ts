import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/Student';
import { Subject } from 'src/app/model/Subject';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enrolllist',
  templateUrl: './enrolllist.component.html',
  styleUrls: ['./enrolllist.component.css']
})
export class EnrolllistComponent implements OnInit {
  apiUrl = environment.apiUrl+'/subjects';
  subjects : Subject [] = [];


  constructor(private http:HttpClientService,
    private ics: IntercomService,private router: Router) { 
      this.getAllSubjects();
  }

  ngOnInit() {
  }

  getAllSubjects(){
    this.http.doGet(this.apiUrl).subscribe(
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
    this.router.navigate(['enroll',id]);
  }

}
