import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoom } from 'src/app/model/ClassRoom';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-classroomsetup',
  templateUrl: './classroomsetup.component.html',
  styleUrls: ['./classroomsetup.component.css']
})
export class ClassroomsetupComponent implements OnInit {
  apiUrl = environment.apiUrl+'/class-rooms';
  id: number = 0;
  classRoom: ClassRoom = new ClassRoom();

  constructor(private http:HttpClientService,
    private ics: IntercomService,private route: ActivatedRoute,
    private router: Router) { 
  }

  newClassRoomForm(){
    this.classRoom = new ClassRoom();
    this.id = 0;
  }

  validateClassRoom(){
    if(this.classRoom.className == null || this.classRoom.className == ''){
      this.showCustomMsg('Classroom name is required',1);
      return false;
    }
    return true;
  }

  saveClassRoom(){
    if(this.validateClassRoom()){
      this.showloading(true);
      let jsonObj = JSON.parse(JSON.stringify( this.classRoom));
      if(this.classRoom.id == null || this.classRoom.id == 0){
        this.http.doPost(this.apiUrl,jsonObj).subscribe(
          (data) => {
            this.showCustomMsg('Classroom added successfully',4);
            this.router.navigate(['classess']);
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
      }else{
        this.http.doPut(this.apiUrl+'/'+this.id,jsonObj).subscribe(
          (data) => {
            this.showCustomMsg('Classroom updated successfully',4);
            this.router.navigate(['classess']);
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
    }
  }

  getClassRoomById(){
    this.showloading(true);
    this.http.doGet(this.apiUrl+'/'+this.id).subscribe(
      (data) => {
        if(data!= null || data != undefined){
          this.classRoom = data;
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

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id') != null || this.route.snapshot.paramMap.get('id') != undefined){
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      if(this.id != 0){
        this.getClassRoomById();
      }
    }
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
