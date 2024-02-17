import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoom } from 'src/app/model/ClassRoom';
import { Student } from 'src/app/model/Student';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

declare var jQuery: any;
@Component({
  selector: 'app-manageclasssetup',
  templateUrl: './manageclasssetup.component.html',
  styleUrls: ['./manageclasssetup.component.css']
})
export class ManageclasssetupComponent implements OnInit {
  apiUrl = environment.apiUrl + '/class-rooms';
  studentApiUrl = environment.apiUrl + '/students/not-joined';
  id: number = 0;
  classRoom: ClassRoom = new ClassRoom();
  students: Student[] = [];
  selectedStudent: Student[] = [];

  constructor(private http: HttpClientService,
    private ics: IntercomService, private route: ActivatedRoute,
    private router: Router) {
  }

  getAllStudentsNotJoinClass() {
    this.showloading(true);
    this.http.doGet(this.studentApiUrl).subscribe(
      (data) => {
        if (data != null && data != undefined && data.length != 0) {
          this.students = data;
          this.students.forEach(student => {
            student.createdAt = new Date(student.createdAt).toLocaleString();
            student.updatedAt = new Date(student.updatedAt).toLocaleString();
          });
        } else {
          this.showCustomMsg('There is no unregistered student left.', 1);
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

  saveStudent() {
    let jsonObj = JSON.parse(JSON.stringify(this.classRoom));
    jsonObj.createdAt = new Date(jsonObj.createdAt);
    jsonObj.updatedAt = new Date(jsonObj.updatedAt);
    jsonObj.studentDto.forEach(student => {
      student.createdAt = new Date(student.createdAt);
      student.updatedAt = new Date(student.updatedAt);
    });

    this.http.doPut(this.apiUrl + '/' + this.id, jsonObj).subscribe(
      (data) => {
        this.showCustomMsg('Student updated successfully', 4);
        this.router.navigate(['manageclasses']);
      },
      (error) => {
        this.showCustomMsg(error, 2);
      }
    );
  }

  getClassRoomById() {
    this.http.doGet(this.apiUrl + '/' + this.id).subscribe(
      (data) => {
        if (data != null || data != undefined) {
          this.classRoom = data;
        }
      },
      (error) => {
        this.showCustomMsg(error, 2);
      }
    );
  }

  addStudent() {
    jQuery("#attendpopup").modal();
    this.selectedStudent = [];
  }

  selectStudent(student, event) {
    if (event.target.checked) {
      this.selectedStudent.push(student);
    } else {
      let index = this.selectedStudent.indexOf(student);
      this.selectedStudent.splice(index, 1);
    }
  }

  joinStudentToClass() {
    if (this.selectedStudent.length == 0) {
      this.showCustomMsg('Please select student', 1);
    } else {
      this.classRoom.studentDto = this.selectedStudent;
      this.saveStudent();
    }
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') != null || this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      if (this.id != 0) {
        this.getClassRoomById();
        this.getAllStudentsNotJoinClass();
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
    if (type === true) { this.ics.sendBean({ t1: 'custom-loading' }); }
    if (type === false) { this.ics.sendBean({ t1: 'custom-loading-off' }); }
  }
}
