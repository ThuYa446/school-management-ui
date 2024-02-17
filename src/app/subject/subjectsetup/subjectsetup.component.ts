import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/model/Subject';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subjectsetup',
  templateUrl: './subjectsetup.component.html',
  styleUrls: ['./subjectsetup.component.css']
})
export class SubjectsetupComponent implements OnInit {
  apiUrl = environment.apiUrl + '/subjects';
  id: number = 0;
  subject: Subject = new Subject();

  constructor(private http: HttpClientService,
    private ics: IntercomService, private route: ActivatedRoute,
    private router: Router) {
  }

  newSubjectForm() {
    this.subject = new Subject();
    this.id = 0;
  }

  validateSubject() {
    if (this.subject.title == null || this.subject.title == '') {
      this.showCustomMsg('Title is required', 1);
      return false;
    }
    return true;
  }

  saveSubject() {
    if (this.validateSubject()) {
      this.showloading(true);
      let jsonObj = JSON.parse(JSON.stringify(this.subject));
      if (this.subject.id == null || this.subject.id == 0) {
        this.http.doPost(this.apiUrl, jsonObj).subscribe(
          (data) => {
            this.showCustomMsg('Subject added successfully', 4);
            this.router.navigate(['subjects']);
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
      } else {
        this.http.doPut(this.apiUrl + '/' + this.id, jsonObj).subscribe(
          (data) => {
            this.showCustomMsg('Subject updated successfully', 4);
            this.router.navigate(['subjects']);
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
    }
  }

  getSubjectById() {
    this.showloading(true);
    this.http.doGet(this.apiUrl + '/' + this.id).subscribe(
      (data) => {
        if (data != null || data != undefined) {
          this.subject = data;
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

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') != null || this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      if (this.id != 0) {
        this.getSubjectById();
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
