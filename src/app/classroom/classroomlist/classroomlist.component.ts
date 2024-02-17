import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassRoom } from 'src/app/model/ClassRoom';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-classroomlist',
  templateUrl: './classroomlist.component.html',
  styleUrls: ['./classroomlist.component.css']
})
export class ClassroomlistComponent implements OnInit {
  apiUrl = environment.apiUrl+'/class-rooms';
  classRooms : ClassRoom [] = [];

  constructor(private http:HttpClientService,
    private ics: IntercomService,private router: Router) { 
      this.getAllClassRooms();
  }

  ngOnInit() {
  }

  newSubject(){
    this.router.navigate(['class',0]);
  }
  getAllClassRooms(){
    this.showloading(true);
    this.http.doGet(this.apiUrl).subscribe(
      (data) => {
        if(data!= null && data != undefined && data.length != 0){
            this.classRooms = data;
            this.classRooms.forEach(classRoom => {
              classRoom.createdAt = new Date(classRoom.createdAt).toLocaleString();
              classRoom.updatedAt = new Date(classRoom.updatedAt).toLocaleString();
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

  editForm(id:number){
    this.router.navigate(['class',id]);
  }

  showCustomMsg(msg, type) {
    if ( type === 1) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Information' }); }
    if ( type === 2) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Error' }); }
    if ( type === 3) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
    if ( type === 4) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Success' }); }
  }

  showloading(type) {
    if (type === true) {this.ics.sendBean({t1: 'custom-loading'}); }
    if (type === false) {this.ics.sendBean({t1: 'custom-loading-off'}); }
  }
}
